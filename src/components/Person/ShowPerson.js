import { useState, useEffect } from "react";
import Loader from "../Comn_data/Loader";
import { useContext } from "react";
import { MyContext } from "../../MyContext";
import { Link } from "react-router-dom";
import { getUserList, deleteUser } from "../../util/Api/ApiHandler";
import ErrMessage from "./ErrMessage";

const ShowPerson = () => {
  const { persons, setPersons } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handelDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await deleteUser(id);
      if (response.status == "200") {
        console.log("item deleted successfully!" + JSON.stringify(response));
        let array = [...persons]; // make a separate copy of the array
        array = array.filter(function (el) {
          return el.id !== id;
        });
        setPersons([...array]);
      } else {
        setError(response.statusText);
      }
    } catch (ex) {
      setError(ex.messsage);
    } finally {
      setIsLoading(false);
      if (error) {
        alert("error during deletion");
      }
    }
  };

  useEffect(() => {
    async function getUserData() {
      try {
        setIsLoading(true);
        const response = await getUserList();
        if (response.status == 200) {
          setPersons([...response.data]);
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
          alert("Error during Submition: Please try again");
        }
      }
    }
    getUserData();
    // console.log(...persons);
  }, []);

  if (!(persons && persons?.length > 0)) {
    return <h1>No user found</h1>;
  } else {
    return (
      <div className="mt-5">
        {isLoading && <Loader />}
        {error && ErrMessage(error)}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {persons?.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td className="td-an-items">
                    <Link to={`/edit-person/${item.id}`}>
                      <i
                        className="fa fa-pencil"
                        aria-hidden="true"
                      ></i>
                      {"\t"}
                    </Link>
                    <Link to={`/person/${item.id}`}>
                      <i
                        className="fa fa-eye"
                        aria-hidden="true"
                      ></i>
                      {"\t"}
                    </Link>
                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => handelDelete(item.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ShowPerson;
