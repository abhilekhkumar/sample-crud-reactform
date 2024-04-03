import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MyContext } from "../../MyContext";
import Loader from "../Comn_data/Loader";
import { updateUser } from "../../util/Api/ApiHandler";
import ErrMessage from "./ErrMessage";

const EditPerson = () => {
  const { persons, setPersons } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();
  const [person, setPerson] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  if (id && person.id === "") {
    let newperson = persons.filter(function (el) {
      return el.id === id;
    });
    console.log(newperson);

    setPerson(newperson[0]);
  }

  useEffect(() => {
    // if (id) {
    //   let newperson = persons.filter(function (el) {
    //     return el.id === id;
    //   });
    //   setPerson(newperson);
    // }
  }, []);

  const handleInpChange = (e) => {
    const { name, value } = e.target;
    setPerson({
      ...person,
      [name]: value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await updateUser(
        person.id,
        JSON.parse(JSON.stringify(person))
      );
      if (response.status == 200) {
        const newPersons = persons.map((p) =>
          p.id === person.id ? { ...p, ...person } : p
        );
        setPersons(newPersons);
        navigate("/show-person");
      } else {
        setError(response.statusText);
      }
      // console.log(response);
    } catch (e) {
      console.log(e);
      setError(e.messsage);
    } finally {
      setIsLoading(false);
      if (error) {
        alert("Error during updaating data: Please try again");
      }
    }
  };

  // return <div>EdditPerson</div>;
  return (
    <div className="user-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && ErrMessage(error)}
        <p>User Form</p>
      </div>

      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label
            htmlFor="name"
            className="form-label"
          >
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={person.name}
            onChange={handleInpChange}
            required
          />
        </div>
        <div className="mb-3 mt-3">
          <label
            htmlFor="email"
            className="form-label"
          >
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={person.email}
            onChange={handleInpChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="phone"
            className="form-label"
          >
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={person.phone}
            onChange={handleInpChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary submit-btn"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditPerson;
