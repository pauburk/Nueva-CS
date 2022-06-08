import React from 'react';
import { Link } from 'react-router-dom';


function NuevanCard (props) {
    const nuevanInfo  = props.nuevanInfo;

    addOne(data) {

      axios
        //TODO: fill in the GET call below with the appropriate URL
        //look at routes
        .put('http://localhost:8082/order/' +data.name, data)
        .then(res => {
            console.log("did something"); 
        })
        .catch(err =>{
          console.log('Error from ShowAllMeals');
        })
    };

    return(
        <div>
            <div>
                <button type="button" onclick=addOne({"name": nuevanInfo.name, "orders": 1})>Add 1</button>
                <h2> {nuevanInfo.name} </h2>
                <p> {nuevanInfo.description}> </p>
            </div>
        </div>
    )
};

export default NuevanCard;

// <h2>
//   {/* Link will go to specified URL*/}
//   {/* Note ` ` quotes to be able to use nuevan info*/}
//   <Link to={`/show/${nuevanInfo.email}`} replace>
//       { nuevanInfo.name }
//   </Link>
// </h2>
// <h3>{nuevanInfo.email}</h3>
// <p>{nuevanInfo.role}</p>
// <p>{nuevanInfo.grade}</p>
