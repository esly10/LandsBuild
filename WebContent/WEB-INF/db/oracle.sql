
CREATE SEQUENCE VEHICLE_ATTR_ID_SEQ;

CREATE TABLE vehicle_attribute (
                vehicle_attr_id NUMBER NOT NULL,
                vehicle_id NUMBER NOT NULL,
                name VARCHAR2(50) NOT NULL,
                value VARCHAR2(4000) NOT NULL,
                CONSTRAINT VEHICLE_ATTRIBUTE_PK PRIMARY KEY (vehicle_attr_id)
);


CREATE INDEX va_vehicle_id
 ON vehicle_attribute
 ( vehicle_id ASC, name ASC );

CREATE SEQUENCE VEHICLE_ID_SEQ;

CREATE TABLE vehicle (
                vehicle_id NUMBER NOT NULL,
                owner_id NUMBER DEFAULT 0 NOT NULL,
                license VARCHAR2(10),
                vin VARCHAR2(50),
                make_id VARCHAR2(50) NOT NULL,
                color_id VARCHAR2(50) NOT NULL,
                state_id VARCHAR2(50),
                create_date TIMESTAMP NOT NULL,
                update_date TIMESTAMP NOT NULL,
                CONSTRAINT VEHICLE_PK PRIMARY KEY (vehicle_id)
);


CREATE INDEX v_license
 ON vehicle
 ( license ASC );

CREATE INDEX v_owner_id
 ON vehicle
 ( owner_id ASC );

CREATE SEQUENCE REPORT_ID_SEQ;

CREATE TABLE report (
                report_id NUMBER NOT NULL,
                name VARCHAR2(255) NOT NULL,
                query_fields VARCHAR2(4000) NOT NULL,
                CONSTRAINT REPORT_PK PRIMARY KEY (report_id)
);


CREATE SEQUENCE OWNER_TYPE_ID_SEQ;

CREATE TABLE owner_type (
                owner_type_id NUMBER NOT NULL,
                name VARCHAR2(50) NOT NULL,
                requires_auth NUMBER DEFAULT 0 NOT NULL,
                active NUMBER DEFAULT 0 NOT NULL,
                CONSTRAINT OWNER_TYPE_PK PRIMARY KEY (owner_type_id)
);


CREATE SEQUENCE OWNER_NOTE_ID_SEQ;

CREATE TABLE owner_note (
                owner_note_id NUMBER NOT NULL,
                owner_id NUMBER DEFAULT 0 NOT NULL,
                created_by VARCHAR2(255) NOT NULL,
                updated_by VARCHAR2(255) NOT NULL,
                note VARCHAR2(4000) NOT NULL,
                create_date TIMESTAMP NOT NULL,
                update_date TIMESTAMP NOT NULL,
                CONSTRAINT OWNER_NOTE_PK PRIMARY KEY (owner_note_id)
);


CREATE INDEX on_owner_id
 ON owner_note
 ( owner_id );

CREATE SEQUENCE OWNER_ATTR_ID_SEQ;

CREATE TABLE owner_attribute (
                owner_attr_id NUMBER NOT NULL,
                owner_id NUMBER NOT NULL,
                name VARCHAR2(50) NOT NULL,
                value VARCHAR2(4000) NOT NULL,
                CONSTRAINT OWNER_ATTRIBUTE_PK PRIMARY KEY (owner_attr_id)
);


CREATE INDEX oa_owner_id
 ON owner_attribute
 ( owner_id ASC, name ASC );

CREATE SEQUENCE OWNER_ID_SEQ;

CREATE TABLE owner (
                owner_id NUMBER NOT NULL,
                status VARCHAR2(10) NOT NULL,
                type_id NUMBER NOT NULL,
                first_name VARCHAR2(50) NOT NULL,
                last_name VARCHAR2(50) NOT NULL,
                email VARCHAR2(255) NOT NULL,
                username VARCHAR2(50) NOT NULL,
                password VARCHAR2(255) NOT NULL,
                home_phone VARCHAR2(20),
                mobile_phone VARCHAR2(20),
                address VARCHAR2(255),
                city VARCHAR2(255),
                state_id VARCHAR2(10),
                zip VARCHAR2(10),
                create_date TIMESTAMP NOT NULL,
                update_date TIMESTAMP NOT NULL,
                password_updated TIMESTAMP NOT NULL,
                CONSTRAINT OWNER_PK PRIMARY KEY (owner_id)
);


CREATE INDEX o_username
 ON owner
 ( username ASC );

CREATE TABLE mpermit_type_to_owner_type (
                mpermit_type_id NUMBER DEFAULT 0 NOT NULL,
                owner_type_id NUMBER DEFAULT 0 NOT NULL
);


CREATE INDEX t2o_type_owner
 ON mpermit_type_to_owner_type
 ( mpermit_type_id ASC, owner_type_id ASC );

CREATE SEQUENCE MPERMIT_TYPE_ATTR_ID_SEQ;

CREATE TABLE mpermit_type_attribute (
                mpermit_type_attr_id NUMBER NOT NULL,
                mpermit_type_id NUMBER NOT NULL,
                name VARCHAR2(50) NOT NULL,
                value VARCHAR2(4000) NOT NULL,
                CONSTRAINT MPERMIT_TYPE_ATTRIBUTE_PK PRIMARY KEY (mpermit_type_attr_id)
);


CREATE INDEX mta_type_id
 ON mpermit_type_attribute
 ( mpermit_type_id ASC, name ASC );

CREATE SEQUENCE MPERMIT_TYPE_ID_SEQ;

CREATE TABLE mpermit_type (
                mpermit_type_id NUMBER NOT NULL,
                name VARCHAR2(50) NOT NULL,
                description VARCHAR2(255) NOT NULL,
                max_vehicles NUMBER DEFAULT 0 NOT NULL,
                period_type VARCHAR2(10) NOT NULL,
                period_start_date TIMESTAMP NOT NULL,
                period_end_date TIMESTAMP NOT NULL,
                period_days NUMBER DEFAULT 0 NOT NULL,
                cost FLOAT DEFAULT 0 NOT NULL,
                requires_shipping NUMBER DEFAULT 0 NOT NULL,
                can_pickup NUMBER DEFAULT 0 NOT NULL,
                can_print NUMBER DEFAULT 0 NOT NULL,
                CONSTRAINT MPERMIT_TYPE_PK PRIMARY KEY (mpermit_type_id)
);


CREATE TABLE mpermit_to_vehicle (
                mpermit_id NUMBER NOT NULL,
                vehicle_id NUMBER NOT NULL
);


CREATE INDEX m2v_permit_id
 ON mpermit_to_vehicle
 ( mpermit_id ASC );

CREATE INDEX m2v_vehicle_id
 ON mpermit_to_vehicle
 ( vehicle_id ASC );

CREATE SEQUENCE MPERMIT_ATTR_ID_SEQ;

CREATE TABLE mpermit_attribute (
                mpermit_attr_id NUMBER NOT NULL,
                mpermit_id NUMBER NOT NULL,
                name VARCHAR2(50) NOT NULL,
                value VARCHAR2(4000) NOT NULL,
                CONSTRAINT MPERMIT_ATTRIBUTE_PK PRIMARY KEY (mpermit_attr_id)
);


CREATE INDEX mp_permit_id
 ON mpermit_attribute
 ( mpermit_id ASC, name ASC );

CREATE SEQUENCE MPERMIT_ID_SEQ;

CREATE TABLE mpermit (
                mpermit_id NUMBER NOT NULL,
                owner_id NUMBER NOT NULL,
                permit_number VARCHAR2(255) NOT NULL,
                status VARCHAR2(10) NOT NULL,
                mpermit_type_id NUMBER NOT NULL,
                valid_start_date TIMESTAMP NOT NULL,
                valid_end_date TIMESTAMP NOT NULL,
                create_date TIMESTAMP NOT NULL,
                update_date TIMESTAMP NOT NULL,
                CONSTRAINT MPERMIT_PK PRIMARY KEY (mpermit_id)
);


CREATE INDEX mp_owner_id
 ON mpermit
 ( owner_id ASC );

CREATE INDEX mp_permit_number
 ON mpermit
 ( permit_number ASC );

CREATE SEQUENCE LATE_FEE_ID_SEQ;

CREATE TABLE late_fee (
                late_fee_id NUMBER NOT NULL,
                violation_id VARCHAR2(50) DEFAULT '0' NOT NULL,
                days_late NUMBER DEFAULT 0 NOT NULL,
                fee_amount FLOAT DEFAULT 0 NOT NULL,
                CONSTRAINT LATE_FEE_PK PRIMARY KEY (late_fee_id)
);


CREATE INDEX lf_violation_id
 ON late_fee
 ( violation_id );

CREATE SEQUENCE INVOICE_ITEM_ID_SEQ;

CREATE TABLE invoice_item (
                invoice_item_id NUMBER NOT NULL,
                invoice_id NUMBER DEFAULT 0 NOT NULL,
                user_id NUMBER DEFAULT 0,
                user_full_name VARCHAR2(250),
                type NUMBER DEFAULT 0 NOT NULL,
                item_date TIMESTAMP NOT NULL,
                amount FLOAT DEFAULT 0 NOT NULL,
                description VARCHAR2(4000) NOT NULL,
                CONSTRAINT INVOICE_ITEM_PK PRIMARY KEY (invoice_item_id)
);


CREATE INDEX ii_invoice
 ON invoice_item
 ( invoice_id );

CREATE SEQUENCE INVOICE_ID_SEQ;

CREATE TABLE invoice (
                invoice_id NUMBER NOT NULL,
                type NUMBER DEFAULT 0 NOT NULL,
                payment_method VARCHAR2(20) DEFAULT 'Credit Card' NOT NULL,
                status VARCHAR2(15) NOT NULL,
                owner_id NUMBER DEFAULT 0 NOT NULL,
                user_id NUMBER DEFAULT 0 NOT NULL,
                user_full_name VARCHAR2(250) NOT NULL,
                check_number VARCHAR2(20),
                reference_id NUMBER DEFAULT 0 NOT NULL,
                auth_code VARCHAR2(50),
                trans_id VARCHAR2(50),
                amount FLOAT DEFAULT 0 NOT NULL,
                billing_first_name VARCHAR2(50),
                billing_last_name VARCHAR2(50),
                billing_email VARCHAR2(50),
                billing_address VARCHAR2(255),
                billing_city VARCHAR2(255),
                billing_state_id VARCHAR2(10),
                billing_zip VARCHAR2(20),
                cc_number VARCHAR2(20),
                cc_type VARCHAR2(20),
                cc_exp_month NUMBER,
                cc_exp_year NUMBER,
                will_pickup NUMBER DEFAULT 0,
                shipping_first_name VARCHAR2(50),
                shipping_last_name VARCHAR2(50),
                shipping_address VARCHAR2(255),
                shipping_city VARCHAR2(255),
                shipping_state_id VARCHAR2(10),
                shipping_zip VARCHAR2(10),
                refund_date TIMESTAMP,
                create_date TIMESTAMP NOT NULL,
                update_date TIMESTAMP NOT NULL,
                CONSTRAINT INVOICE_PK PRIMARY KEY (invoice_id)
);


CREATE INDEX i_owner_id
 ON invoice
 ( owner_id );

CREATE INDEX i_reference
 ON invoice
 ( type, reference_id );

CREATE SEQUENCE DEVICE_ID_SEQ;

CREATE TABLE device (
                device_id NUMBER NOT NULL,
                name VARCHAR2(255) NOT NULL,
                device_uid VARCHAR2(100) NOT NULL,
                citation_prefix VARCHAR2(10) NOT NULL,
                citation_next NUMBER DEFAULT 0 NOT NULL,
                active NUMBER DEFAULT 0 NOT NULL,
                sync_interval NUMBER DEFAULT 5 NOT NULL,
                format_index NUMBER NOT NULL,
                CONSTRAINT DEVICE_PK PRIMARY KEY (device_id)
);


CREATE INDEX device_uid
 ON device
 ( device_uid ASC );

CREATE SEQUENCE USER_ID_SEQ;

CREATE TABLE cws_user (
                user_id NUMBER NOT NULL,
                first_name VARCHAR2(255) NOT NULL,
                last_name VARCHAR2(255) NOT NULL,
                officer_id VARCHAR2(20) NOT NULL,
                username VARCHAR2(255) NOT NULL,
                password VARCHAR2(255) NOT NULL,
                permissions NUMBER DEFAULT 0 NOT NULL,
                password_updated TIMESTAMP NOT NULL,
                CONSTRAINT CWS_USER_PK PRIMARY KEY (user_id)
);


CREATE INDEX cu_username
 ON cws_user
 ( username );

CREATE SEQUENCE CONFIG_ITEM_ID_SEQ;

CREATE TABLE config_item (
                config_item_id NUMBER NOT NULL,
                name VARCHAR2(255) NOT NULL,
                text_value VARCHAR2(4000),
                int_value NUMBER DEFAULT 0,
                item_order NUMBER DEFAULT 0,
                CONSTRAINT CONFIG_ITEM_PK PRIMARY KEY (config_item_id)
);


CREATE INDEX config_item_name
 ON config_item
 ( name ASC );

CREATE INDEX config_item_value
 ON config_item
 ( text_value );

CREATE TABLE codes (
                type VARCHAR2(20),
                codeid VARCHAR2(50),
                description VARCHAR2(255),
                fine_amount VARCHAR2(10),
                fine_type VARCHAR2(50),
                is_overtime NUMBER DEFAULT 0,
                is_other NUMBER DEFAULT 0 NOT NULL,
                added NUMBER,
                updated NUMBER,
                hashcode NUMBER
);


CREATE INDEX codes_id
 ON codes
 ( type ASC, codeid ASC );

CREATE INDEX codes_description
 ON codes
 ( type ASC, description ASC );

CREATE INDEX codes_hashcode
 ON codes
 ( hashcode ASC );

CREATE SEQUENCE CITATION_PHOTO_ID_SEQ;

CREATE TABLE citation_photo (
                citation_photo_id NUMBER NOT NULL,
                citation_id NUMBER DEFAULT 0 NOT NULL,
                photo CLOB NOT NULL,
                CONSTRAINT CITATION_PHOTO_PK PRIMARY KEY (citation_photo_id)
);


CREATE INDEX cp_citation_id
 ON citation_photo
 ( citation_id ASC );

CREATE SEQUENCE ATTR_ID_SEQ;

CREATE TABLE citation_attribute (
                attr_id NUMBER NOT NULL,
                citation_id NUMBER NOT NULL,
                field_ref VARCHAR2(255) NOT NULL,
                value_id VARCHAR2(255) NOT NULL,
                value VARCHAR2(4000) NOT NULL,
                CONSTRAINT CITATION_ATTRIBUTE_PK PRIMARY KEY (attr_id)
);


CREATE INDEX ca_citation_field
 ON citation_attribute
 ( citation_id ASC, field_ref ASC );

CREATE SEQUENCE CITATION_APPEAL_ID_SEQ;

CREATE TABLE citation_appeal (
                citation_appeal_id NUMBER NOT NULL,
                citation_id NUMBER DEFAULT 0 NOT NULL,
                appeal_date TIMESTAMP NOT NULL,
                status VARCHAR2(20) DEFAULT 'New' NOT NULL,
                name VARCHAR2(255) NOT NULL,
                email VARCHAR2(255) NOT NULL,
                phone VARCHAR2(20) NOT NULL,
                address VARCHAR2(255) NOT NULL,
                city VARCHAR2(255) NOT NULL,
                state_id VARCHAR2(50) NOT NULL,
                zip VARCHAR2(15) NOT NULL,
                reason VARCHAR2(4000) NOT NULL,
                decision_date TIMESTAMP,
                decision_reason VARCHAR2(4000),
                CONSTRAINT CITATION_APPEAL_PK PRIMARY KEY (citation_appeal_id)
);


CREATE INDEX ca_citation_id
 ON citation_appeal
 ( citation_id ASC );

CREATE SEQUENCE CITATION_ID_SEQ;

CREATE TABLE citation (
                citation_id NUMBER NOT NULL,
                citation_number VARCHAR2(50) NOT NULL,
                pin VARCHAR2(10),
                status VARCHAR2(20) DEFAULT 'Not Paid' NOT NULL,
                owner_id NUMBER DEFAULT 0,
                vehicle_id NUMBER DEFAULT 0,
                permit_number VARCHAR2(255),
                officer_id VARCHAR2(50),
                citation_date TIMESTAMP NOT NULL,
                license VARCHAR2(30),
                vin VARCHAR2(30),
                color_id VARCHAR2(50),
                color_description VARCHAR2(4000),
                make_id VARCHAR2(50),
                make_description VARCHAR2(4000),
                state_id VARCHAR2(50),
                state_description VARCHAR2(4000),
                violation_id VARCHAR2(50) NOT NULL,
                violation_type VARCHAR2(50) NOT NULL,
                violation_description VARCHAR2(4000) NOT NULL,
                violation_amount FLOAT DEFAULT 0 NOT NULL,
                violation_start TIMESTAMP,
                violation_end TIMESTAMP,
                location_id VARCHAR2(50),
                location_description VARCHAR2(4000),
                lat FLOAT DEFAULT 0,
                lng FLOAT DEFAULT 0,
                comment_id VARCHAR2(50),
                comments VARCHAR2(4000),
                override_fine_amount FLOAT DEFAULT 0,
                override_late_fee FLOAT DEFAULT 0,
                override_expiration TIMESTAMP,
                exported NUMBER DEFAULT 0,
                update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                CONSTRAINT CITATION_PK PRIMARY KEY (citation_id)
);


CREATE INDEX c_license
 ON citation
 ( license ASC );

CREATE INDEX c_vin
 ON citation
 ( vin ASC );

CREATE INDEX c_number_pin
 ON citation
 ( citation_number ASC, pin );

CREATE INDEX c_owner_id
 ON citation
 ( owner_id, vehicle_id );

CREATE TABLE cc_type (
                cc_type_id NUMBER NOT NULL,
                name VARCHAR2(250) NOT NULL,
                regex VARCHAR2(100) NOT NULL,
                accepted NUMBER NOT NULL,
                image_name VARCHAR2(10),
                CONSTRAINT CC_TYPE_PK PRIMARY KEY (cc_type_id)
);