//Grid Totals plugin
//http://www.rahulsingla.com/blog/2010/04/ext-net-gridpanel-columns-summary-plugin-(without-grouping)
Ext.ux.GridTotals = Ext.extend(Ext.util.Observable, {
    constructor: function(config) {
        config = config || {};
        this.showHeaderInTotals = config.showHeaderInTotals;
        this.divideRowHeightBy2 = config.divideRowHeightBy2;

        Ext.ux.GridTotals.superclass.constructor.call(this, config);
    },

    init: function(g) {
        var v = g.getView();
        this.grid = g;
        this.store = g.getStore();

        //Need to override GridView's findRow to not consider total's row as normal grid row.
        v.findRow = function(el) {
            if (!el) {
                return false;
            }

            if (this.fly(el).findParent('.x-grid-total-row', this.rowSelectorDepth)) {
                return (false);
            } else {
                return this.fly(el).findParent(this.rowSelector, this.rowSelectorDepth);
            }
        }

        g.cls = (g.cls || '') + 'x-grid3-simple-totals';
        g.gridTotals = this;

        this.store.on({
            reconfigure: { fn: this.onGridReconfigure, scope: this },
            add: { fn: this.updateTotals, scope: this },
            remove: { fn: this.updateTotals, scope: this },
            update: { fn: this.updateTotals, scope: this },
            datachanged: { fn: this.updateTotals, scope: this }
        });

        v.onLayout = v.onLayout.createSequence(this.onLayout, this);
        v.initElements = v.initElements.createSequence(this.initElements, this);
        v.onAllColumnWidthsUpdated = v.onAllColumnWidthsUpdated.createSequence(this.onLayout, this);
        v.onColumnWidthUpdated = v.onColumnWidthUpdated.createSequence(this.onLayout, this);
    },

    initElements: function() {
        var v = this.grid.getView();
        v.scroller.on('scroll', function() {
            v.totalsRow.setStyle({
                left: -v.scroller.dom.scrollLeft + 'px'
            });
        });
    },

    onLayout: function() {
        this.updateTotals();
        this.fixScrollerPosition();
    },

    fixScrollerPosition: function() {
        var v = this.grid.getView();
        var bottomScrollbarWidth = v.scroller.getHeight() - v.scroller.dom.clientHeight;
        v.totalsRow.setStyle({
            bottom: bottomScrollbarWidth + 'px',
            width: Math.min(v.mainBody.getWidth(), v.scroller.dom.clientWidth) + 'px'
        });

        //Reduce the height of the scroller to create spce for totals row to avoid overlapping.
        var height = (this.divideRowHeightBy2 !== false) ? v.totalsRow.dom.clientHeight / 2 : v.totalsRow.dom.clientHeight;
        v.scroller.setHeight(v.scroller.dom.clientHeight - height);
    },

    getTotals: function() {
        var v = this.grid.getView();

        var cs = v.getColumnData();
        var totals = new Array(cs.length);
        var store;
        if(v.grid.summaryStore && v.grid.store.reader.jsonData){
        	store = v.grid.summaryStore;
        	var properties = [];
        	
        	for(var i=0; i < v.grid.store.reader.jsonData.summaryRoot.length; i++){
        		var myobj = v.grid.store.reader.jsonData.summaryRoot[0];
        		for(var key in myobj) {
        		    if(myobj.hasOwnProperty(key) && typeof myobj[key] !== 'function') {
        		        properties.push(key);
        		    }
        		}
        	}
        	
        	var defaultData = {};
        	for(var i=0; i < properties.length; i++){
      		var myobj = v.grid.store.reader.jsonData.summaryRoot[0];
        		defaultData[properties[i]] = myobj[properties[i]];
        	}

    		var r = new store.recordType(defaultData, Ext.id()); // create new record
    		store.add(r);
        }else{
            store = v.grid.store;
        }

        var fields = store.recordType.prototype.fields;
        var columns = v.cm.config;

        for (var i = 0, l = store.getCount(); i < l; i++) {
            var rec = store.getAt(i);
            for (var c = 0, nc = cs.length; c < nc; c++) {
                var f = cs[c].name;
                var t = !Ext.isEmpty(f) ? fields.get(f).type : '';
                if (columns[c].totalsText) {
                    totals[c] = columns[c].totalsText;
                    //} else if (t.type == 'int' || t.type == 'float') {
                } else if (columns[c].summaryType) {
                    var v = rec.get(f);
                    if (Ext.isDefined(totals[c])) {
                        switch (columns[c].summaryType) {
                            case 'sum':
                                totals[c] += v;
                                break;
                            case 'min':
                                if (v < totals[c]) {
                                    totals[c] = v;
                                }
                                break;
                            case 'max':
                                if (v > totals[c]) {
                                    totals[c] = v;
                                }
                                break;
                            case 'sumServer':
                            	totals[c] = Ext.util.Format.number(v, '0.00');
                                break; 
                                 
                        }
                    } else {
                        switch (columns[c].summaryType) {
                            case 'count':
                                totals[c] = l;
                                break;

                            default:
                                totals[c] = v;
                                break;
                        }
                    }
                }
            }
        }

        this.fixScrollerPosition();
        return (totals);
    },

    getRenderedTotals: function() {
        var v = this.grid.getView();
        var totals = this.getTotals();

        var cs = v.getColumnData();
        var store = v.grid.store;
        var columns = v.cm.config;

        var cells = '', p = {};
        for (var c = 0, nc = cs.length, last = nc - 1; c < nc; c++) {
            if (columns[c].roundToPlaces) {
                totals[c] = Math.roundToPlaces(totals[c], columns[c].roundToPlaces);
            }

            if (this.showHeaderInTotals) {
                if (Ext.isEmpty(totals[c])) {
                    totals[c] = '&nbsp;';
                } else {
                    totals[c] += ': ' + cs[c].scope.header;
                }
            }

            var v = Ext.isDefined(totals[c]) ? totals[c] : '';

            if (columns[c].summaryType && columns[c].summaryRenderer) {
                var renderer = columns[c].summaryRenderer;
                if (Ext.isString(renderer)) {
                    renderer = Ext.util.Format[renderer];
                }
                totals[c] = renderer(v, p, undefined, undefined, c, store);
            }
        }
        this.fixScrollerPosition();
        return (totals);
    },

    updateTotals: function() {
        if (!this.grid.rendered) {
            return;
        }

        var v = this.grid.getView();

        if (!v.totalsRow) {
            v.mainWrap.setStyle('position', 'relative');
            v.totalsRow = v.templates.row.append(v.mainWrap, {
                tstyle: 'width:' + v.mainBody.getWidth(),
                cells: ''
            }, true);
            v.totalsRow.addClass('x-grid-total-row');
            v.totalsTr = v.totalsRow.child('tr').dom;
        }

        var totals = this.getRenderedTotals();

        var cs = v.getColumnData();

        var cells = '', p = {};
        for (var c = 0, nc = cs.length, last = nc - 1; c < nc; c++) {
            p.id = cs[c].id;
            p.style = cs[c].style;
            p.css = c == 0 ? 'x-grid3-cell-first ' : (c == last ? 'x-grid3-cell-last ' : '');

            cells += v.templates.cell.apply(Ext.apply({
                value: totals[c]
            }, cs[c]));
        }
        while (v.totalsTr.hasChildNodes()) {
            v.totalsTr.removeChild(v.totalsTr.lastChild);
        }
        Ext.DomHelper.insertHtml('afterBegin', v.totalsTr, cells);
    },

    onGridReconfigure: Ext.emptyFn
});

//Utility Method for rounding values.
Math.roundToPlaces = function(num, dec) {
    var result = Math.round(Math.round(num * Math.pow(10, dec + 1)) / Math.pow(10, 1)) / Math.pow(10, dec);
    return result;
}

