import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MyContext } from "../../MyContext";
import Loader from "../Comn_data/Loader";

const Person = () => {
  const { persons } = useContext(MyContext);
  const { id } = useParams();
  let person = {
    id: "",
    name: "",
    email: "",
    phone: "",
  };
  // console.log(id);

  if (id && person.id === "") {
    let newperson = persons.filter(function (el) {
      return el.id === id;
    });
    // console.log(newperson[0]);

    person = { ...person, ...newperson[0] };
  }

  // return <div>Person</div>;
  return (
    <div className="user mt-5">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{person.name ? person.name : "empty"}</td>

            <td>{person.email ? person.email : "empty"}</td>

            <td>{person.phone ? person.phone : "empty"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Person;
