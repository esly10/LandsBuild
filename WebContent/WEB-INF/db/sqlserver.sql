
CREATE TABLE vehicle_attribute (
                vehicle_attr_id INT IDENTITY NOT NULL,
                vehicle_id INT NOT NULL,
                name VARCHAR(50) NOT NULL,
                value VARCHAR(MAX) NOT NULL,
                CONSTRAINT vehicle_attribute_PK PRIMARY KEY (vehicle_attr_id)
)
CREATE  NONCLUSTERED INDEX va_vehicle_id
 ON vehicle_attribute
 ( vehicle_id, name )


CREATE TABLE vehicle (
                vehicle_id INT IDENTITY NOT NULL,
                owner_id INT DEFAULT 0 NOT NULL,
                license VARCHAR(10),
                vin VARCHAR(50),
                make_id VARCHAR(50) NOT NULL,
                color_id VARCHAR(50) NOT NULL,
                state_id VARCHAR(50),
                create_date DATETIME NOT NULL,
                update_date DATETIME NOT NULL,
                CONSTRAINT vehicle_PK PRIMARY KEY (vehicle_id)
)
CREATE  NONCLUSTERED INDEX v_license
 ON vehicle
 ( license )

CREATE  NONCLUSTERED INDEX v_owner_id
 ON vehicle
 ( owner_id )


CREATE TABLE report (
                report_id INT IDENTITY NOT NULL,
                name VARCHAR(255) NOT NULL,
                query_fields VARCHAR(MAX) NOT NULL,
                CONSTRAINT report_PK PRIMARY KEY (report_id)
)

CREATE TABLE owner_type (
                owner_type_id INT IDENTITY NOT NULL,
                name VARCHAR(50) NOT NULL,
                requires_auth BIT DEFAULT 0 NOT NULL,
                active BIT DEFAULT 0 NOT NULL,
                CONSTRAINT owner_type_PK PRIMARY KEY (owner_type_id)
)

CREATE TABLE owner_note (
                owner_note_id INT IDENTITY NOT NULL,
                owner_id INT DEFAULT 0 NOT NULL,
                created_by VARCHAR(255) NOT NULL,
                updated_by VARCHAR(255) NOT NULL,
                note VARCHAR(MAX) NOT NULL,
                create_date DATETIME NOT NULL,
                update_date DATETIME NOT NULL,
                CONSTRAINT owner_note_PK PRIMARY KEY (owner_note_id)
)
CREATE  NONCLUSTERED INDEX on_owner_id
 ON owner_note
 ( owner_id )


CREATE TABLE owner_attribute (
                owner_attr_id INT IDENTITY NOT NULL,
                owner_id INT NOT NULL,
                name VARCHAR(50) NOT NULL,
                value VARCHAR(MAX) NOT NULL,
                CONSTRAINT owner_attribute_PK PRIMARY KEY (owner_attr_id)
)
CREATE  NONCLUSTERED INDEX oa_owner_id
 ON owner_attribute
 ( owner_id, name )


CREATE TABLE owner (
                owner_id INT IDENTITY NOT NULL,
                status VARCHAR(10) NOT NULL,
                type_id INT NOT NULL,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(255) NOT NULL,
                username VARCHAR(50) NOT NULL,
                password VARCHAR(255) NOT NULL,
                home_phone VARCHAR(20),
                mobile_phone VARCHAR(20),
                address VARCHAR(255),
                city VARCHAR(255),
                state_id VARCHAR(10),
                zip VARCHAR(10),
                create_date DATETIME NOT NULL,
                update_date DATETIME NOT NULL,
                password_updated DATETIME NOT NULL,
                CONSTRAINT owner_PK PRIMARY KEY (owner_id)
)
CREATE  NONCLUSTERED INDEX o_username
 ON owner
 ( username )


CREATE TABLE mpermit_type_to_owner_type (
                mpermit_type_id INT DEFAULT 0 NOT NULL,
                owner_type_id INT DEFAULT 0 NOT NULL
)
CREATE  NONCLUSTERED INDEX t2o_type_owner
 ON mpermit_type_to_owner_type
 ( mpermit_type_id, owner_type_id )


CREATE TABLE mpermit_type_attribute (
                mpermit_type_attr_id INT IDENTITY NOT NULL,
                mpermit_type_id INT NOT NULL,
                name VARCHAR(50) NOT NULL,
                value VARCHAR(MAX) NOT NULL,
                CONSTRAINT mpermit_type_attribute_PK PRIMARY KEY (mpermit_type_attr_id)
)
CREATE  NONCLUSTERED INDEX mta_type_id
 ON mpermit_type_attribute
 ( mpermit_type_id, name )


CREATE TABLE mpermit_type (
                mpermit_type_id INT IDENTITY NOT NULL,
                name VARCHAR(50) NOT NULL,
                description VARCHAR(255) NOT NULL,
                max_vehicles INT DEFAULT 0 NOT NULL,
                period_type VARCHAR(10) NOT NULL,
                period_start_date DATETIME ,
                period_end_date DATETIME ,
                period_days INT DEFAULT 0 NOT NULL,
                cost FLOAT DEFAULT 0 NOT NULL,
                requires_shipping INT DEFAULT 0 NOT NULL,
                can_pickup INT DEFAULT 0 NOT NULL,
                can_print INT DEFAULT 0 NOT NULL,
                CONSTRAINT mpermit_type_PK PRIMARY KEY (mpermit_type_id)
)

CREATE TABLE mpermit_to_vehicle (
                mpermit_id INT NOT NULL,
                vehicle_id INT NOT NULL
)
CREATE  NONCLUSTERED INDEX m2v_permit_id
 ON mpermit_to_vehicle
 ( mpermit_id )

CREATE  NONCLUSTERED INDEX m2v_vehicle_id
 ON mpermit_to_vehicle
 ( vehicle_id )


CREATE TABLE mpermit_attribute (
                mpermit_attr_id INT IDENTITY NOT NULL,
                mpermit_id INT NOT NULL,
                name VARCHAR(50) NOT NULL,
                value VARCHAR(MAX) NOT NULL,
                CONSTRAINT mpermit_attribute_PK PRIMARY KEY (mpermit_attr_id)
)
CREATE  NONCLUSTERED INDEX mp_permit_id
 ON mpermit_attribute
 ( mpermit_id, name )


CREATE TABLE mpermit (
                mpermit_id INT IDENTITY NOT NULL,
                owner_id INT NOT NULL,
                permit_number VARCHAR(255) NOT NULL,
                status VARCHAR(10) NOT NULL,
                mpermit_type_id INT NOT NULL,
                valid_start_date DATETIME NOT NULL,
                valid_end_date DATETIME NOT NULL,
                create_date DATETIME NOT NULL,
                update_date DATETIME NOT NULL,
                CONSTRAINT mpermit_PK PRIMARY KEY (mpermit_id)
)
CREATE  NONCLUSTERED INDEX mp_owner_id
 ON mpermit
 ( owner_id )

CREATE  NONCLUSTERED INDEX mp_permit_number
 ON mpermit
 ( permit_number )


CREATE TABLE late_fee (
                late_fee_id INT IDENTITY NOT NULL,
                violation_id VARCHAR(50) DEFAULT '0' NOT NULL,
                days_late INT DEFAULT 0 NOT NULL,
                fee_amount FLOAT DEFAULT 0 NOT NULL,
                CONSTRAINT late_fee_PK PRIMARY KEY (late_fee_id)
)
CREATE  NONCLUSTERED INDEX lf_violation_id
 ON late_fee
 ( violation_id )


CREATE TABLE invoice_item (
                invoice_item_id INT IDENTITY NOT NULL,
                invoice_id INT DEFAULT 0 NOT NULL,
                user_id INT DEFAULT 0,
                user_full_name VARCHAR(250),
                type INT DEFAULT 0 NOT NULL,
                item_date DATETIME NOT NULL,
                amount FLOAT DEFAULT 0 NOT NULL,
                description VARCHAR(MAX) NOT NULL,
                CONSTRAINT invoice_item_PK PRIMARY KEY (invoice_item_id)
)
CREATE  NONCLUSTERED INDEX ii_invoice
 ON invoice_item
 ( invoice_id )


CREATE TABLE invoice (
                invoice_id INT IDENTITY NOT NULL,
                type INT DEFAULT 0 NOT NULL,
                payment_method VARCHAR(20) DEFAULT 'Credit Card' NOT NULL,
                status VARCHAR(15) NOT NULL,
                owner_id INT DEFAULT 0 NOT NULL,
                user_id INT DEFAULT 0 NOT NULL,
                user_full_name VARCHAR(250) NOT NULL,
                check_number VARCHAR(20),
                reference_id INT DEFAULT 0 NOT NULL,
                auth_code VARCHAR(50),
                trans_id VARCHAR(50),
                amount FLOAT DEFAULT 0 NOT NULL,
                billing_first_name VARCHAR(50),
                billing_last_name VARCHAR(50),
                billing_email VARCHAR(50),
                billing_address VARCHAR(255),
                billing_city VARCHAR(255),
                billing_state_id VARCHAR(10),
                billing_zip VARCHAR(20),
                cc_number VARCHAR(20),
                cc_type VARCHAR(20),
                cc_exp_month INT,
                cc_exp_year INT,
                will_pickup TINYINT DEFAULT 0,
                shipping_first_name VARCHAR(50),
                shipping_last_name VARCHAR(50),
                shipping_address VARCHAR(255),
                shipping_city VARCHAR(255),
                shipping_state_id VARCHAR(10),
                shipping_zip VARCHAR(10),
                refund_date DATETIME,
                create_date DATETIME NOT NULL,
                update_date DATETIME NOT NULL,
                CONSTRAINT invoice_PK PRIMARY KEY (invoice_id)
)
CREATE  NONCLUSTERED INDEX i_owner_id
 ON invoice
 ( owner_id )

CREATE  NONCLUSTERED INDEX i_reference
 ON invoice
 ( type, reference_id )


CREATE TABLE device (
                device_id INT IDENTITY NOT NULL,
                name VARCHAR(255) NOT NULL,
                device_uid VARCHAR(100) NOT NULL,
                citation_prefix VARCHAR(10) NOT NULL,
                citation_next INT DEFAULT 0 NOT NULL,
                active INT DEFAULT 0 NOT NULL,
                sync_interval INT DEFAULT 5 NOT NULL,
                format_index INT NOT NULL,
                CONSTRAINT device_PK PRIMARY KEY (device_id)
)
CREATE  NONCLUSTERED INDEX device_uid
 ON device
 ( device_uid )


CREATE TABLE cws_user (
                user_id INT IDENTITY NOT NULL,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                officer_id VARCHAR(20) NOT NULL,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                permissions INT DEFAULT 0 NOT NULL,
                password_updated DATETIME NOT NULL,
                CONSTRAINT cws_user_PK PRIMARY KEY (user_id)
)
CREATE  NONCLUSTERED INDEX cu_username
 ON cws_user
 ( username )


CREATE TABLE config_item (
                config_item_id INT IDENTITY NOT NULL,
                name VARCHAR(255) NOT NULL,
                text_value VARCHAR(MAX),
                int_value INT DEFAULT 0,
                item_order INT DEFAULT 0,
                CONSTRAINT config_item_PK PRIMARY KEY (config_item_id)
)
CREATE  NONCLUSTERED INDEX config_item_name
 ON config_item
 ( name )


CREATE TABLE codes (
                type VARCHAR(20),
                codeid VARCHAR(50),
                description VARCHAR(255),
                fine_amount VARCHAR(10),
                fine_type VARCHAR(50),
                is_overtime INT DEFAULT 0,
                is_other INT DEFAULT 0 NOT NULL,
                added INT,
                updated INT,
                hashcode INT
)
CREATE  NONCLUSTERED INDEX codes_id
 ON codes
 ( type, codeid )

CREATE  NONCLUSTERED INDEX codes_description
 ON codes
 ( type, description )

CREATE  NONCLUSTERED INDEX codes_hashcode
 ON codes
 ( hashcode )


CREATE TABLE citation_photo (
                citation_photo_id INT IDENTITY NOT NULL,
                citation_id INT DEFAULT 0 NOT NULL,
                photo VARCHAR(MAX) NOT NULL,
                CONSTRAINT citation_photo_PK PRIMARY KEY (citation_photo_id)
)
CREATE  NONCLUSTERED INDEX cp_citation_id
 ON citation_photo
 ( citation_id )


CREATE TABLE citation_attribute (
                attr_id INT IDENTITY NOT NULL,
                citation_id INT NOT NULL,
                field_ref VARCHAR(255) NOT NULL,
                value_id VARCHAR(255) NOT NULL,
                value VARCHAR(MAX) NOT NULL,
                CONSTRAINT citation_attribute_PK PRIMARY KEY (attr_id)
)
CREATE  NONCLUSTERED INDEX ca_citation_field
 ON citation_attribute
 ( citation_id, field_ref )


CREATE TABLE citation_appeal (
                citation_appeal_id INT IDENTITY NOT NULL,
                citation_id INT DEFAULT 0 NOT NULL,
                appeal_date DATETIME NOT NULL,
                status VARCHAR(20) DEFAULT 'New' NOT NULL,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                address VARCHAR(255) NOT NULL,
                city VARCHAR(255) NOT NULL,
                state_id VARCHAR(50) NOT NULL,
                zip VARCHAR(15) NOT NULL,
                reason VARCHAR(MAX) NOT NULL,
                decision_date DATETIME,
                decision_reason VARCHAR(MAX),
                CONSTRAINT citation_appeal_PK PRIMARY KEY (citation_appeal_id)
)
CREATE  NONCLUSTERED INDEX ca_citation_id
 ON citation_appeal
 ( citation_id )


CREATE TABLE citation (
                citation_id INT IDENTITY NOT NULL,
                citation_number VARCHAR(50) NOT NULL,
                pin VARCHAR(10),
                status VARCHAR(20) DEFAULT 'Not Paid' NOT NULL,
                owner_id INT DEFAULT 0,
                vehicle_id INT DEFAULT 0,
                permit_number VARCHAR(255),
                officer_id VARCHAR(50),
                citation_date DATETIME NOT NULL,
                license VARCHAR(30),
                vin VARCHAR(30),
                color_id VARCHAR(50),
                color_description VARCHAR(MAX),
                make_id VARCHAR(50),
                make_description VARCHAR(MAX),
                state_id VARCHAR(50),
                state_description VARCHAR(MAX),
                violation_id VARCHAR(50) NOT NULL,
                violation_type VARCHAR(50) NOT NULL,
                violation_description VARCHAR(MAX) NOT NULL,
                violation_amount FLOAT DEFAULT 0 NOT NULL,
                violation_start DATETIME,
                violation_end DATETIME,
                location_id VARCHAR(50),
                location_description VARCHAR(MAX),
                lat FLOAT DEFAULT 0,
                lng FLOAT DEFAULT 0,
                comment_id VARCHAR(50),
                comments VARCHAR(MAX),
                override_fine_amount FLOAT DEFAULT 0,
                override_late_fee FLOAT DEFAULT 0,
                override_expiration DATETIME,
                exported BIT DEFAULT 0,
                update_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                CONSTRAINT citation_PK PRIMARY KEY (citation_id)
)
CREATE  NONCLUSTERED INDEX c_license
 ON citation
 ( license )

CREATE  NONCLUSTERED INDEX c_vin
 ON citation
 ( vin )

CREATE  NONCLUSTERED INDEX c_number_pin
 ON citation
 ( citation_number, pin )

CREATE  NONCLUSTERED INDEX c_owner_id
 ON citation
 ( owner_id, vehicle_id )


CREATE TABLE cc_type (
                cc_type_id INT NOT NULL,
                name VARCHAR(250) NOT NULL,
                regex VARCHAR(100) NOT NULL,
                accepted BIT NOT NULL,
                image_name VARCHAR(10),
                CONSTRAINT cc_type_PK PRIMARY KEY (cc_type_id)
)


INSERT INTO cc_type(cc_type_id,name,regex,accepted,image_name) VALUES (1,'Visa','^4[0-9]{12}([0-9]{3})?$',0,'visa')
INSERT INTO cc_type(cc_type_id,name,regex,accepted,image_name) VALUES (2,'Mastercard','^5[1-5][0-9]{14}$',0,'mastercard')
INSERT INTO cc_type(cc_type_id,name,regex,accepted,image_name) VALUES (3,'American Express','^3[47][0-9]{13}$',0,'american')
INSERT INTO cc_type(cc_type_id,name,regex,accepted,image_name) VALUES (4,'Diners Club','^3(0[0-5]|[68][0-9])[0-9]{11}$',0,'dinersclub')
INSERT INTO cc_type(cc_type_id,name,regex,accepted,image_name) VALUES (5,'Discover','^6011[0-9]{12}$',0,'discover')
INSERT INTO cc_type(cc_type_id,name,regex,accepted,image_name) VALUES (6,'JCB','^(3[0-9]{4}|2131|1800)[0-9]{11}$',0,'jcb')

INSERT INTO cws_user (first_name, last_name, officer_id, username, password, permissions,password_updated) VALUES
('Administrator', 'Admin', '0000', 'admin', 'ISMvKXpXpadDiUoOSoAfww==', 1,CURRENT_TIMESTAMP)