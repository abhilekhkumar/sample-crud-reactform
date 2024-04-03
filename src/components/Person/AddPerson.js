import { useState, useContext } from "react";
import { MyContext } from "../../MyContext";
import Loader from "../Comn_data/Loader";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../util/Api/ApiHandler";
import ErrMessage from "./ErrMessage";
const AddPerson = () => {
  const { persons, setPersons } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const genKey = (inp) => {
    return `${inp}_${new Date().getTime()}`;
  };
  const [person, setPerson] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleInpChange = (e) => {
    const { name, value } = e.target;
    setPerson({
      ...person,
      [name]: value,
    });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    let key = genKey(person.name.trim());

    try {
      setIsLoading(true);
      let personWithId = JSON.parse(
        JSON.stringify({
          ...person,
          id: key,
        })
      );

      console.log(personWithId);
      const response = await addUser(personWithId);

      if (response.status == "201") {
        console.log("Form submitted successfully!" + JSON.stringify(response));

        setPersons([
          ...persons,
          {
            ...person,
            id: key,
          },
        ]);

        navigate("/show-person");
      } else {
        setError(response.message);
        console.error("Form submission failed!" + JSON.stringify(response));
      }
    } catch (error) {
      setError(error.message);

      console.log(error.message);
    } finally {
      setIsLoading(false);
      if (error) {
        alert("Error during Submition: Please try again");
      }
    }

    setPerson({
      id: "",
      name: "",
      email: "",
      phone: "",
    });
  };

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

export default AddPerson;
