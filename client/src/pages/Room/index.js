import React from 'react';
import { useAuth } from "../../utils/use-auth";

import Chat from './Chat';
import Section from '../../components/Section';

const Room = () => {
  return (
    <Section>
      <Title />
      <Chat />
      <br /><br /><br />
    </Section>
  );
}

const Title = () => {
  const auth = useAuth();
  return (
      <h1 style={{ color: "white" }}>{`Welcome, ${auth.user.username}`}</h1>
  );
}

export default Room;