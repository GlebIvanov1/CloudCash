import React from "react";
import { Link } from "react-router";

const TermsAndPolicy: React.FC = () => {
  return (
    <>
      <Link className="TermsBack" to={"/"}>Back</Link>

      <p className="Terms">do not enter your real data</p>
    </>
  );
};

export default TermsAndPolicy;
