import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import EventsList from './EventsList';
import CreateAccount from './CreateAccount';
import { useParams } from 'react-router-dom';

function Main() {
  const {id} = useParams();
  console.log("idd" + id);
  return (
    <div>
      
      <EventsList/>

    </div>
  );
}

export default Main;
