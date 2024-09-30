const CustomInput = ({ type, label, id, name, onChng, onBlr, val }) => {
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">{label}</label>
        <input
          type={type}
          className="form-control"
          id={id}
          name={name}
          onChange={onChng}
          onBlur={onBlr}
          value={val || ''} // Ensure it defaults to an empty string
        />
      </div>
    );
  };
export default CustomInput