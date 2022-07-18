import { useState } from "react";

import { citiesInput } from "./input_data/cities";
import { inputList } from "./input_data/listInput";

import { Table, Form, Button } from "react-bootstrap";

function App() {
  const [input, setInput] = useState({ description: "" });
  const [list, setList] = useState(inputList);
  const [errors, setErrors] = useState({});
  const [isVisible, setVisibility] = useState(false);

  const clearInput = () => {
    setInput({
      description: "",
      type: "default",
      date: "",
      recipientCity: "default",
      senterCity: "default",
    });
  };

  const handleClose = () => {
    clearInput();
    setVisibility(false);
  };
  const handleShow = (listing) => {
    setInput(listing);
    setErrors({});
    setVisibility(true);
  };

  const handleDelete = (id) => {
    const updatedList = list.filter((listing) => {
      return listing.id !== id;
    });
    setList(updatedList);
    handleClose();
  };

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    if (!input.senterCity || input.senterCity === "default") {
      formIsValid = false;
      errors.senterValidation = "Senter field is required.";
    }
    if (!input.recipientCity || input.recipientCity === "default") {
      formIsValid = false;
      errors.recipientValidation = "Recipient field is required. ";
    }
    if (!input.type || input.type === "default") {
      formIsValid = false;
      errors.typeValidation = "Type field is required.";
    }
    if (
      input.senterCity &&
      input.recipientCity &&
      input.senterCity === input.recipientCity
    ) {
      formIsValid = false;
      errors.cityValidation = "Please select different cities.";
    }
    if (input.description === undefined || input.description.length < 10) {
      formIsValid = false;
      errors.descriptionValidation =
        "Decription length should be atleast 10 symbols.";
    }
    if (input.date === undefined || input.date === "") {
      formIsValid = false;
      errors.dateValidation = "Please select date of dispatch.";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = () => {
    console.log(input.date);
    if (handleValidation()) {
      setList([...list, { ...input, id: Date.now() }]);

      clearInput();
    }
  };

  const handleEdit = () => {
    if (handleValidation()) {
      const newList = list.map((listing) => {
        if (listing.id === input.id) {
          return input;
        }
        return listing;
      });
      setList(newList);
      handleClose();
    }
  };

  return (
    <div className="App">
      <h3 className="p-2 px-5 mb-2 bg-secondary text-white">ParcelPackager</h3>
      <div id="form" className="container">
        <Form className="mx-auto card col-12 col-sm-6 my-4 p-3 ">
          <h4 className="card-title text-center">
            {isVisible ? "Edit parcel" : "Add parcel"}
          </h4>
          <Form.Group className="mb-2 w-50" controlId="formSenterSelect">
            <Form.Label className="mx-2">Sent from</Form.Label>
            <Form.Select
              value={input.senterCity}
              defaultValue={"default"}
              onChange={(e) =>
                setInput({ ...input, senterCity: e.target.value })
              }
            >
              <option disabled hidden value={"default"}>
                Select city
              </option>
              {citiesInput.map((city, index) => {
                return (
                  <option key={index} value={city}>
                    {city}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Text className="mx-2 text-danger">
              {errors.senterValidation}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-2 w-50" controlId="formRecipientSelect">
            <Form.Label className="mx-2">Sent to</Form.Label>
            <Form.Select
              value={input.recipientCity}
              defaultValue={"default"}
              onChange={(e) =>
                setInput({ ...input, recipientCity: e.target.value })
              }
            >
              <option disabled hidden value={"default"}>
                Select city
              </option>
              {citiesInput.map((city, index) => {
                return (
                  <option key={index} value={city}>
                    {city}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Text className="mx-2 text-danger">
              {errors.recipientValidation}
              {errors.cityValidation}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-2 w-50" controlId="formTypeSelect">
            <Form.Label className="mx-2">Type</Form.Label>
            <Form.Select
              value={input.type}
              defaultValue={"default"}
              onChange={(e) => setInput({ ...input, type: e.target.value })}
            >
              <option disabled hidden value={"default"}>
                Select type
              </option>
              <option value="Gadgets">Gadgets</option>
              <option value="Drinks">Drinks</option>
              <option value="Clothes">Clothes</option>
              <option value="Medicine">Medicine</option>
              <option value="Other">Other</option>
            </Form.Select>
            <Form.Text className="mx-2 text-danger">
              {errors.typeValidation}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-2 w-50" controlId="formDateControl">
            <Form.Label className="mx-2">Date of dispatch</Form.Label>
            <Form.Control
              type="date"
              value={input.date}
              onChange={(e) => setInput({ ...input, date: e.target.value })}
            />
            <Form.Text className="mx-2 text-danger">
              {errors.dateValidation}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-2" controlId="formDescriptionControl">
            <Form.Label className="mx-2">Description</Form.Label>
            <Form.Control
              type="text"
              value={input.description}
              onChange={(e) =>
                setInput({ ...input, description: e.target.value })
              }
              placeholder="Description"
            />
            <Form.Text className="mx-2 text-danger">
              {errors.descriptionValidation}
            </Form.Text>
          </Form.Group>

          {isVisible ? (
            <div className="row w-75 mx-auto">
              <Button variant="secondary col mx-1" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="danger col mx-1"
                onClick={() => {
                  handleDelete(input.id);
                }}
              >
                Delete Parcel
              </Button>
              <Button variant="primary col mx-1" onClick={handleEdit}>
                Save Changes
              </Button>
            </div>
          ) : (
            <Button
              className="w-50 my-2 mx-auto"
              variant="info text-white"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Submit
            </Button>
          )}
        </Form>
      </div>
      <div className="container">
        <h4>Parcel List</h4>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>From</th>
              <th>To</th>
              <th>Type</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ) : (
              list.map((listing, index) => {
                return (
                  <tr key={listing.id}>
                    <td>{index + 1}</td>
                    <td>{listing.senterCity}</td>
                    <td>{listing.recipientCity}</td>
                    <td>{listing.type}</td>
                    <td>{listing.date}</td>
                    <td>{listing.description}</td>
                    <td>
                      <Button
                        variant="info text-white"
                        onClick={() => {
                          handleShow(listing);
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
