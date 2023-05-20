import React, {FC, memo} from "react";
import { Card } from "antd";
import { Client } from "../models";

interface UserCardProps {
    client: Client
}

const ClientCard: FC<UserCardProps> = memo(function({client}) {
    return (
        <Card title={client.name + ' ' + client.surname} bordered={false}>
            <p>Age: {client.age}</p>
            <p>Phone: {client.phone}</p>
            <p>Country: {client.country}</p>
        </Card>
    )
})

export default ClientCard