import React, {FC} from "react";
import { Menu } from "antd";

interface UserMenuProps {
    handleLogout: () => void
}

const UserMenu: FC<UserMenuProps> = ({handleLogout}) => {
    return (
        <Menu>
            <Menu.Item key="1" onClick={handleLogout}>
                Sign Out
            </Menu.Item>
        </Menu>
    )
}

export default UserMenu