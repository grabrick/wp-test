import m from "./FieldsComponent.module.scss";
import { Field, Form } from "react-final-form";
import notFound from "../../../../assets/images/image-line.svg";
import { useSelector } from "react-redux";
import { useServerError } from "../../../../assets/extra/ServerErrorProvider/ServerErrorProvider";

function FieldsComponent({ items }) {
  const { addError } = useServerError();
  const {fieldsError} = useSelector(state => state.fieldsSlice)

  const validate = (values) => {
    const errors = {};
  
    Object.keys(values).forEach((fieldName) => {
      const fieldValue = values[fieldName];

      if (fieldValue && fieldValue.length < 5) {
        errors[fieldName] = "Введите минимум 5 символов";
      }
    });
  
    return errors;
  };

  const onSubmit = async (value) => {
    if (fieldsError !== null) {
        addError(fieldsError);
    }
  };

  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <div className={m.infoWrapper}>
          <img
            className={m.img}
            src={items?.picture_url ? items?.picture_url : notFound}
            alt=""
          />
          <h3 className={m.title}>{items?.title}</h3>
        </div>

        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form className={m.form} onSubmit={handleSubmit}>
              <div className={m.formWrapper}>
                {items?.fields.map((formInput) => (
                  <Field name={formInput.name} key={formInput.name}>
                    {({ input, meta }) => (
                      <div className={m.inputWrapper}>
                        <h3 className={m.inputTitle}>{formInput.title}</h3>
                        <input
                          type={formInput.type}
                          placeholder={formInput.title}
                          className={meta.error ? m.error : m.input}
                          {...input}
                        />
                        {meta.touched && meta.error && (
                          <span className={m.spanError}>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                ))}
              </div>
              <button type="submit" className={m.button}>
                Сохранить
              </button>
            </form>
          )}
        />
      </div>
    </div>
  );
}

export default FieldsComponent;
