
CREATE TABLE vehicle_attribute (
                vehicle_attr_id INT AUTO_INCREMENT NOT NULL,
                vehicle_id INT NOT NULL,
                name VARCHAR(50) NOT NULL,
                value TEXT NOT NULL,
                PRIMARY KEY (vehicle_attr_id)
);


CREATE INDEX va_vehicle_id USING BTREE
 ON vehicle_attribute
 ( vehicle_id ASC, name ASC );

CREATE TABLE vehicle (
                vehicle_id INT AUTO_INCREMENT NOT NULL,
                owner_id INT DEFAULT 0 NOT NULL,
                license VARCHAR(10),
                vin VARCHAR(50),
                make_id VARCHAR(50) NOT NULL,
                color_id VARCHAR(50) NOT NULL,
                state_id VARCHAR(50),
                create_date TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                update_date TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                PRIMARY KEY (vehicle_id)
);


CREATE INDEX v_license USING BTREE
 ON vehicle
 ( license ASC );

CREATE INDEX v_owner_id USING BTREE
 ON vehicle
 ( owner_id ASC );

CREATE TABLE report (
                report_id INT AUTO_INCREMENT NOT NULL,
                name VARCHAR(255) NOT NULL,
                query_fields TEXT NOT NULL,
                PRIMARY KEY (report_id)
);


CREATE TABLE owner_type (
                owner_type_id INT AUTO_INCREMENT NOT NULL,
                name VARCHAR(50) NOT NULL,
                requires_auth TINYINT DEFAULT 0 NOT NULL,
                active TINYINT DEFAULT 0 NOT NULL,
                PRIMARY KEY (owner_type_id)
);


CREATE TABLE owner_note (
                owner_note_id INT AUTO_INCREMENT NOT NULL,
                owner_id INT DEFAULT 0 NOT NULL,
                created_by VARCHAR(255) NOT NULL,
                updated_by VARCHAR(255) NOT NULL,
                note TEXT NOT NULL,
                create_date TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                update_date TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                PRIMARY KEY (owner_note_id)
);


CREATE INDEX on_owner_id
 ON owner_note
 ( owner_id );

CREATE TABLE owner_attribute (
                owner_attr_id INT AUTO_INCREMENT NOT NULL,
                owner_id INT NOT NULL,
                name VARCHAR(50) NOT NULL,
                value TEXT NOT NULL,
                PRIMARY KEY (owner_attr_id)
);


CREATE INDEX oa_owner_id USING BTREE
 ON owner_attribute
 ( owner_id ASC, name ASC );

CREATE TABLE owner (
                owner_id INT AUTO_INCREMENT NOT NULL,
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
                create_date TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                update_date TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                password_updated TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                PRIMARY KEY (owner_id)
);


CREATE INDEX o_username USING BTREE
 ON owner
 ( username ASC );

CREATE TABLE mpermit_type_to_owner_type (
                mpermit_type_id INT DEFAULT 0 NOT NULL,
                owner_type_id INT DEFAULT 0 NOT NULL
);


CREATE INDEX t2o_type_owner USING BTREE
 ON mpermit_type_to_owner_type
 ( mpermit_type_id ASC, owner_type_id ASC );

CREATE TABLE mpermit_type_attribute (
                mpermit_type_attr_id INT AUTO_INCREMENT NOT NULL,
                mpermit_type_id INT NOT NULL,
                name VARCHAR(50) NOT NULL,
                value TEXT NOT NULL,
                PRIMARY KEY (mpermit_type_attr_id)
);


CREATE INDEX mta_type_id USING BTREE
 ON mpermit_type_attribute
 ( mpermit_type_id ASC, name ASC );

CREATE TABLE mpermit_type (
                mpermit_type_id INT AUTO_INCREMENT NOT NULL,
                name VARCHAR(50) NOT NULL,
                description VARCHAR(255) NOT NULL,
                max_vehicles INT DEFAULT 0 NOT NULL,
                period_type VARCHAR(10) NOT NULL,
                period_start_date TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                period_end_date TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                period_days INT DEFAULT 0 NOT NULL,
                cost FLOAT DEFAULT 0 NOT NULL,
                requires_shipping INT DEFAULT 0 NOT NULL,
                can_pickup INT DEFAULT 0 NOT NULL,
                can_print INT DEFAULT 0 NOT NULL,
                PRIMARY KEY (mpermit_type_id)
);


CREATE TABLE mpermit_to_vehicle (
                mpermit_id INT NOT NULL,
                vehicle_id INT NOT NULL
);


CREATE INDEX m2v_permit_id USING BTREE
 ON mpermit_to_vehicle
 ( mpermit_id ASC );

CREATE INDEX m2v_vehicle_id USING BTREE
 ON mpermit_to_vehicle
 ( vehicle_id ASC );

CREATE TABLE mpermit_attribute (
                mpermit_attr_id INT AUTO_INCREMENT NOT NULL,
                mpermit_id INT NOT NULL,
                name VARCHAR(50) NOT NULL,
                value TEXT NOT NULL,
                PRIMARY KEY (mpermit_attr_id)
);


CREATE INDEX mp_permit_id USING BTREE
 ON mpermit_attribute
 ( mpermit_id ASC, name ASC );

CREATE TABLE mpermit (
                mpermit_id INT AUTO_INCREMENT NOT NULL,
                owner_id INT NOT NULL,
                permit_number VARCHAR(255) NOT NULL,
                status VARCHAR(10) NOT NULL,
                mpermit_type_id INT NOT NULL,
                valid_start_date TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                valid_end_date TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                create_date TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                update_date TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                PRIMARY KEY (mpermit_id)
);


CREATE INDEX mp_owner_id USING BTREE
 ON mpermit
 ( owner_id ASC );

CREATE INDEX mp_permit_number USING BTREE
 ON mpermit
 ( permit_number ASC );

CREATE TABLE late_fee (
                late_fee_id INT AUTO_INCREMENT NOT NULL,
                violation_id VARCHAR(50) DEFAULT '0' NOT NULL,
                days_late INT DEFAULT 0 NOT NULL,
                fee_amount FLOAT DEFAULT 0 NOT NULL,
                PRIMARY KEY (late_fee_id)
);


CREATE INDEX lf_violation_id
 ON late_fee
 ( violation_id );

CREATE TABLE invoice_item (
                invoice_item_id INT AUTO_INCREMENT NOT NULL,
                invoice_id INT DEFAULT 0 NOT NULL,
                user_id INT DEFAULT 0,
                user_full_name VARCHAR(250),
                type INT DEFAULT 0 NOT NULL,
                item_date TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                amount FLOAT DEFAULT 0 NOT NULL,
                description TEXT NOT NULL,
                PRIMARY KEY (invoice_item_id)
);


CREATE INDEX ii_invoice
 ON invoice_item
 ( invoice_id );

CREATE TABLE invoice (
                invoice_id INT AUTO_INCREMENT NOT NULL,
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
                refund_date TIMESTAMP DEFAULT '0000-00-00 00:00:00',
                create_date TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                update_date TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                PRIMARY KEY (invoice_id)
);


CREATE INDEX i_owner_id
 ON invoice
 ( owner_id );

CREATE INDEX i_reference
 ON invoice
 ( type, reference_id );

CREATE TABLE device (
                device_id INT AUTO_INCREMENT NOT NULL,
                name VARCHAR(255) NOT NULL,
                device_uid VARCHAR(100) NOT NULL,
                citation_prefix VARCHAR(10) NOT NULL,
                citation_next INT DEFAULT 0 NOT NULL,
                active INT DEFAULT 0 NOT NULL,
                sync_interval INT DEFAULT 5 NOT NULL,
                format_index INT NOT NULL,
                PRIMARY KEY (device_id)
);


CREATE INDEX device_uid USING BTREE
 ON device
 ( device_uid ASC );

CREATE TABLE cws_user (
                user_id INT AUTO_INCREMENT NOT NULL,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                officer_id VARCHAR(20) NOT NULL,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                permissions INT DEFAULT 0 NOT NULL,
                password_updated TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                PRIMARY KEY (user_id)
);


CREATE INDEX cu_username
 ON cws_user
 ( username );

CREATE TABLE config_item (
                config_item_id INT AUTO_INCREMENT NOT NULL,
                name VARCHAR(255) NOT NULL,
                text_value TEXT,
                int_value INT DEFAULT 0,
                item_order INT DEFAULT 0,
                PRIMARY KEY (config_item_id)
);


CREATE INDEX config_item_name USING BTREE
 ON config_item
 ( name ASC );

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
);


CREATE INDEX codes_id USING BTREE
 ON codes
 ( type ASC, codeid ASC );

CREATE INDEX codes_description USING BTREE
 ON codes
 ( type ASC, description ASC );

CREATE INDEX codes_hashcode USING BTREE
 ON codes
 ( hashcode ASC );

CREATE TABLE citation_photo (
                citation_photo_id INT AUTO_INCREMENT NOT NULL,
                citation_id INT DEFAULT 0 NOT NULL,
                photo LONGTEXT NOT NULL,
                PRIMARY KEY (citation_photo_id)
);


CREATE INDEX cp_citation_id USING BTREE
 ON citation_photo
 ( citation_id ASC );

CREATE TABLE citation_attribute (
                attr_id INT AUTO_INCREMENT NOT NULL,
                citation_id INT NOT NULL,
                field_ref VARCHAR(255) NOT NULL,
                value_id VARCHAR(255) NOT NULL,
                value TEXT NOT NULL,
                PRIMARY KEY (attr_id)
);


CREATE INDEX ca_citation_field USING BTREE
 ON citation_attribute
 ( citation_id ASC, field_ref ASC );

CREATE TABLE citation_appeal (
                citation_appeal_id INT AUTO_INCREMENT NOT NULL,
                citation_id INT DEFAULT 0 NOT NULL,
                appeal_date TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                status VARCHAR(20) DEFAULT 'New' NOT NULL,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                address VARCHAR(255) NOT NULL,
                city VARCHAR(255) NOT NULL,
                state_id VARCHAR(50) NOT NULL,
                zip VARCHAR(15) NOT NULL,
                reason TEXT NOT NULL,
                decision_date TIMESTAMP DEFAULT '0000-00-00 00:00:00',
                decision_reason TEXT,
                PRIMARY KEY (citation_appeal_id)
);


CREATE INDEX ca_citation_id USING BTREE
 ON citation_appeal
 ( citation_id ASC );

CREATE TABLE citation (
                citation_id INT AUTO_INCREMENT NOT NULL,
                citation_number VARCHAR(50) NOT NULL,
                pin VARCHAR(10),
                status VARCHAR(20) DEFAULT 'Not Paid' NOT NULL,
                owner_id INT DEFAULT 0,
                vehicle_id INT DEFAULT 0,
                permit_number VARCHAR(255),
                officer_id VARCHAR(50),
                citation_date TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
                license VARCHAR(30),
                vin VARCHAR(30),
                color_id VARCHAR(50),
                color_description TEXT,
                make_id VARCHAR(50),
                make_description TEXT,
                state_id VARCHAR(50),
                state_description TEXT,
                violation_id VARCHAR(50) NOT NULL,
                violation_type VARCHAR(50) NOT NULL,
                violation_description TEXT NOT NULL,
                violation_amount FLOAT DEFAULT 0 NOT NULL,
                violation_start TIMESTAMP,
                violation_end TIMESTAMP,
                location_id VARCHAR(50),
                location_description TEXT,
                lat FLOAT DEFAULT 0,
                lng FLOAT DEFAULT 0,
                comment_id VARCHAR(50),
                comments TEXT,
                override_fine_amount FLOAT DEFAULT 0,
                override_late_fee FLOAT DEFAULT 0,
                override_expiration TIMESTAMP DEFAULT '0000-00-00 00:00:00',
                exported TINYINT DEFAULT 0,
                update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                PRIMARY KEY (citation_id)
);


CREATE INDEX c_license USING BTREE
 ON citation
 ( license ASC );

CREATE INDEX c_vin USING BTREE
 ON citation
 ( vin ASC );

CREATE INDEX c_number_pin USING BTREE
 ON citation
 ( citation_number ASC, pin );

CREATE INDEX c_owner_id
 ON citation
 ( owner_id, vehicle_id );

CREATE TABLE cc_type (
                cc_type_id INT NOT NULL,
                name VARCHAR(250) NOT NULL,
                regex VARCHAR(100) NOT NULL,
                accepted TINYINT NOT NULL,
                image_name VARCHAR(10),
                PRIMARY KEY (cc_type_id)
);


INSERT INTO cc_type(cc_type_id,name,regex,accepted,image_name) VALUES (1,'Visa','^4[0-9]{12}([0-9]{3})?$',0,'visa');
INSERT INTO cc_type(cc_type_id,name,regex,accepted,image_name) VALUES (2,'Mastercard','^5[1-5][0-9]{14}$',0,'mastercard');
INSERT INTO cc_type(cc_type_id,name,regex,accepted,image_name) VALUES (3,'American Express','^3[47][0-9]{13}$',0,'american');
INSERT INTO cc_type(cc_type_id,name,regex,accepted,image_name) VALUES (4,'Diners Club','^3(0[0-5]|[68][0-9])[0-9]{11}$',0,'dinersclub');
INSERT INTO cc_type(cc_type_id,name,regex,accepted,image_name) VALUES (5,'Discover','^6011[0-9]{12}$',0,'discover');
INSERT INTO cc_type(cc_type_id,name,regex,accepted,image_name) VALUES (6,'JCB','^(3[0-9]{4}|2131|1800)[0-9]{11}$',0,'jcb');


INSERT INTO cws_user (user_id, first_name, last_name, officer_id, username, password, permissions,password_updated) VALUES
(NULL, 'Administrator', 'Admin', '0000', 'admin', 'ISMvKXpXpadDiUoOSoAfww==', 1,CURRENT_TIMESTAMP);