import React from 'react';
import ContactCardWrapper, * as ContactCard from '../../../../components/App/Resume/ContactCard';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const renderContactList = (list) => (
    list.map((item,index) => (
        <ContactCard.ContactItem key={index}>
            <Icon icon={item.icon} size="lg"/>
            <a href={item.link ? item.link:"javascript:void(0)" } target="_self">{item.text}</a>
        </ContactCard.ContactItem>
    ))
)

const ContactCardTemplate = (props) => {
    return (
        <ContactCardWrapper>
            <ContactCard.Title>
                Contact
            </ContactCard.Title>
            <ContactCard.ContactItems>
                {renderContactList(props.data)}
            </ContactCard.ContactItems>
        </ContactCardWrapper>
    )
}

export default ContactCardTemplate;