import React, { Component, Fragment } from "react";

import Navbar from "./navbar";
import Labels from "./labels";
import Joi from "@hapi/joi";

import bwipjs from "bwip-js";
import LabelForm from "./labelForm";
import LabelPreview from "./labelPreview";

class LabelMaker extends Component {
  state = {
    macAddressValue: "",
    macLabel: "",
    errors: [],
    csvData: [],
  };

  schema = Joi.object({
    macAddressValue: Joi.string().min(12).max(12).label("Mac Address Value"),
    macLabel: Joi.string().min(1).max(4).label("Mac Label"),
  });

  componentDidMount() {
    try {
      //eslint-disable-next-line
      let canvas = bwipjs.toCanvas("mycanvas", {
        bcid: "datamatrix",
        text: "AABBCCDDEEFF",
        width: 28,
        height: 28,
      });
    } catch (e) {
      console.log(e);
    }
  }
  componentDidUpdate() {
    try {
      //eslint-disable-next-line
      let canvas = bwipjs.toCanvas("mycanvas", {
        bcid: "datamatrix",
        text: this.state.macAddressValue,
        width: 28,
        height: 28,
      });
    } catch (e) {
      console.log(e);
    }
  }
  validateProperty(name, value) {
    const { error } = this.schema.validate({
      [name]: value,
    });

    let errors = this.state.errors;
    if (!error) {
      errors[name] = null;
      this.setState({ errors });
      return;
    }

    errors[name] = error.details[0].message;
    this.setState({ errors });
  }

  handleMacAddressChange = ({ target }) => {
    const value = target.value.toUpperCase();
    if (value.length > 12) return;
    this.validateProperty("macAddressValue", value);

    this.setState({ macAddressValue: value });
  };

  handleMacLabelChange = ({ target }) => {
    const value = target.value.toUpperCase();
    if (value.length > 4) return;
    this.validateProperty("macLabel", value);

    this.setState({ macLabel: value });
  };

  handleOnFileLoad = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
    let csvData = [];
    for (let i = 0; i < data.length; i++) {
      if (i !== 0 && data[i].data[0]) {
        csvData.push({
          [data[0].data[0]]: data[i].data[0],
          [data[0].data[1]]: data[i].data[1],
        });
      }
    }
    this.setState({ csvData });
    console.log(csvData);
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  handleprint = (e) => {
    e.preventDefault();
    const { csvData, errors } = this.state;

    console.log(csvData);
    let printString = "";

    if (csvData.length > 1) {
      for (let i = 0; i < csvData.length; i++) {
        this.validateProperty("macAddressValue", csvData[i].macAddressValue);
        this.validateProperty("macLabel", csvData[i].macLabel);
        if (errors.macAddressValue || errors.macLabel) return;

        printString = printString.concat(`^XA
          ^FO10,10^BXN,6,200,18, 18^FD${csvData[i].macAddressValue}^FS
          ^FO 130, 40 ^A 0, 20 ^FD${csvData[i].macLabel}^FS
          ^FO 130, 70 ^A 0, 20 ^FDMAC^FS
          ^FO 10, 130 ^A 0, 30 ^FD${csvData[i].macAddressValue.substring(
            0,
            2
          )}^FS
          ^FO 80, 130 ^A 0, 30 ^FD${csvData[i].macAddressValue.substring(
            2,
            4
          )}^FS
          ^FO 150, 130 ^A 0, 30 ^FD${csvData[i].macAddressValue.substring(
            4,
            6
          )}^FS
          ^FO 10, 165 ^A 0, 30 ^FD${csvData[i].macAddressValue.substring(
            6,
            8
          )}^FS
          ^FO 80, 165 ^A 0, 30 ^FD${csvData[i].macAddressValue.substring(
            8,
            10
          )}^FS
          ^FO 150, 165 ^A 0, 30 ^FD${csvData[i].macAddressValue.substring(
            10,
            12
          )}^FS
          ^XZ
          `);
      }
    }
    if (csvData.length === 0) {
      this.validateProperty("macAddressValue", this.state.macAddressValue);
      this.validateProperty("macLabel", this.state.macLabel);
      if (this.state.errors.macAddressValue || this.state.errors.macLabel)
        return;

      printString = `
      ^XA
      ^FO10,10^BXN,3,200,18, 18^FDAABBCCDDEEFF^FS
      ^FO 70, 30 ^A 0, 10 ^FDWLAN^FS
      ^FO 70, 40 ^A 0, 10 ^FDMAC^FS
      ^FO 10, 130 ^A 0, 20 ^FDAA^FS
      ^FO 80, 130 ^A 0, 30 ^FDBB^FS
      ^FO 150, 130 ^A 0, 30 ^FDCC^FS
      ^FO 10, 165 ^A 0, 30 ^FDDD^FS
      ^FO 80, 165 ^A 0, 30 ^FDEE^FS
      ^FO 150, 165 ^A 0, 30 ^FDFF^FS
      ^XZ
      `;
    }

    const printWindow = window.open();
    printWindow.document.open("text/plain");
    printWindow.document.write(printString);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  render() {
    const { macLabel, macAddressValue, errors } = this.state;
    console.log(this.state.errors);
    return (
      <Fragment>
        <Navbar />

        <div className="container mt-4">
          <div className="row">
            <div className="col-sm-3">
              <Labels />
            </div>
            <div className="col-sm-9">
              <div className="row">
                <div className="col-sm-6">
                  <LabelForm
                    macLabel={macLabel}
                    onMacLabelChange={this.handleMacLabelChange}
                    macAddressValue={macAddressValue}
                    onMacAddressValueChange={this.handleMacAddressChange}
                    errors={errors}
                    onPrint={this.handleprint}
                    handleOnError={this.handleOnError}
                    handleOnFileLoad={this.handleOnFileLoad}
                    handleOnRemoveFile={this.handleOnRemoveFile}
                  />
                </div>
                <div className="col-sm-6">
                  <LabelPreview
                    macLabel={macLabel}
                    macAddressValue={macAddressValue}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="container">
            <span className="text-muted">
              Innovei Technologies © {new Date().getFullYear()}
            </span>
          </div>
        </footer>
      </Fragment>
    );
  }
}

export default LabelMaker;
