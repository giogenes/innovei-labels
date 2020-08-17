import React from "react";

const Labels = () => {
  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">Labels</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="bg-light">
            <span>
              <h5>Dell MAC Label</h5>
              <img
                width="60px"
                src="https://res.cloudinary.com/djuytm4lm/image/upload/v1597607631/dell_mac_label_lbdfpo.svg"
                alt=""
              />{" "}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Labels;
