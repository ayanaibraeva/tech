import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import {Typography} from "../../../../UI/Typography/Typography.tsx";

export const ContactsLinkItem = (props) => {
    const { handleContactsClick, className } = props
    const { t } = useTranslation()

    return (
        <li className={className}>
            <NavLink to='/contacts' onClick={handleContactsClick} aria-label="contacts">
                <Typography variant='h6'>
                    contacts
                </Typography>
            </NavLink>
        </li>
    )
}
