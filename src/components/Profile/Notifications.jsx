import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersNotificationAction } from "../State/Order/Action";
import { Card } from "@mui/material";

const Notifications = () => {
  const dispatch = useDispatch();

  const { order, auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUsersNotificationAction(auth.jwt));
  }, []);
console.log("Notificaciones:", order.notifications); 

  return (
    <div className="space-y-5 px-5 lg:px-20">
      <h1 className="py-5 font-bold text-2xl text-center">Notificaciones</h1>
      {order.notifications?.map((item) => (
        <Card className="p-5">
          <p>{item.message}</p>
        </Card>
      ))}
    </div>
  );
};

export default Notifications;
