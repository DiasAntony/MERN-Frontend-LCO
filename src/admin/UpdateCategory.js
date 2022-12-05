import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getCategories,
  getCategory,
  updateCategory,
  updateProduct
} from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";

const UpdateCategory = ({match}) => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
  
    const { user, token } = isAutheticated();
  
    const goBack = () => (
      <div className="mt-5">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
         Back
        </Link>
      </div>
    );
  
    const handleChange = event => {
      setError("");
      setName(event.target.value);
    };

    
      //backend request fired
      const preload = categoryId => {
        getCategory(categoryId).then(data => {
          //console.log(data);
          if (data.error) {
            setName({ ...Name });
            setError({error:data.error})
          } else {
            // it's automatically place hold input in db value of exact category
            setValues({
              ...Name,
              name: data.category,
              
            });
          }

        });

  
    useEffect(() => {
        preload(match.params.categoryId);
      }, []);

    const onSubmit = event => {
      event.preventDefault();
      setName({...Name})
      setError("");
    //   setSuccess(false);

      updateCategory(match.params.categoryId, user._id, token).then(
        data => {
          if (data.error) {
            setName({...Name})
            setError({error:data.error})
          } else {
            setName({
              ...Name,
              name: "",
            //  success:true
            });
      setSuccess(true);

          }
        }
      );
  
      };
  
    const successMessage = () => {
      if (success) {
        return <h4 className="text-dark">Category update successfully</h4>;
      }
    };
  
    const warningMessage = () => {
      if (error) {
        return <h4 className="text-danger">Failed to update category</h4>;
      }
    };
  
    const myCategoryForm = () => (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For Ex. Summer"
          />
          <button onClick={onSubmit} className="btn btn-outline-dark">
            update Category
          </button>
        </div>
      </form>
    );
  
    return (
      <Base
        title="update a category here"
        description="Update a existing category for existing tshirts"
        className="container bg-success p-4"
      >
        <div className="row bg-white rounded">
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {warningMessage()}
            {myCategoryForm()}
            {goBack()}
          </div>
        </div>
      </Base>
    );
  };
}
  export default UpdateCategory;