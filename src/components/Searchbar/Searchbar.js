import { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSearch } from 'react-icons/bi';
import './Searchbar.css';

export default class Searchbar extends Component {
  state = {
    searchName: '',
  };

  //method to get value from input and write into state.searchName
  handleSearchingNameChange = (event) => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
    // console.log(this.state.searchName);
  };

  //get the prop from
  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.searchName.trim() === '') {
      return toast.warning('Please enter images tag');
    }

    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <ToastContainer />

        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <BiSearch size="32" className="react-icons-search" />
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchName}
            onChange={this.handleSearchingNameChange}
          />
        </form>
      </header>
    );
  }
}

// export const Searchbar = ({ onSubmit }) => {
//   const handleSubmit = (values, actions) => {
//     onSubmit(values);
//     actions.resetForm();
//   };
//   return (
// <header className="searchbar">
//   <Formik initialValues={{ hello: '' }} onSubmit={handleSubmit}>
//     <Form className="form">
//       <button type="submit" className="button">
//         <BiSearch size="32" className="react-icons-search" />
//         <span className="button-label">Search</span>
//       </button>

//       <input
//         className="input"
//         type="text"
//         autoComplete="off"
//         autoFocus
//         placeholder="Search images and photos"
//       />
//     </Form>
//   </Formik>
// </header>
//   );
// };
