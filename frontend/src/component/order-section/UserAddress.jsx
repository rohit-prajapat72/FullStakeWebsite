// AddressSection.jsx
import styled from "styled-components";

const Section = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #4f46e5;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;

  label {
    color: #4b5563;
    font-weight: 500;
    margin-bottom: 0.3rem;
  }

  input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    outline: none;

    &:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3);
    }
  }
`;

const AddressSection = ({ address, setAddress }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Section>
      <SectionTitle>Shipping Address</SectionTitle>
      <FieldGroup>
        {[
          { label: "Address Line 1", name: "addressLine1" },
          { label: "Address Line 2", name: "addressLine2" },
          { label: "City", name: "city" },
          { label: "State", name: "state" },
          { label: "Country", name: "country" },
          { label: "Pincode", name: "pincode" },
        ].map((field, idx) => (
          <FormFieldWrapper key={idx}>
            <label>{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={address[field.name]}
              onChange={handleChange}
            />
          </FormFieldWrapper>
        ))}
      </FieldGroup>
    </Section>
  );
};

export default AddressSection;
