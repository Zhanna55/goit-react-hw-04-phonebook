import { Formik, Field, Form, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { FormContainer, FormLabel, FormButton } from './ContactForm.styled';

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(
      "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),
  number: yup
    .string()
    .required()
    .matches(
      '\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}',
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    ),
});

const ContactForm = ({ onSubmit }) => {
  const handleSubmit = ({ name, number }, { resetForm }) => {
    onSubmit({ id: nanoid(), name, number });
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormContainer>
        <Form autoComplete="off">
          <FormLabel htmlFor="name">
            Name
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </FormLabel>
          <FormLabel htmlFor="number">
            Number
            <Field type="tel" name="number" />
            <ErrorMessage name="number" component="div" />
          </FormLabel>
          <FormButton type="submit">Add contact</FormButton>
        </Form>
      </FormContainer>
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
