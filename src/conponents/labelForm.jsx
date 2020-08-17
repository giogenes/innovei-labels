import React, { Component } from "react";
import { CSVReader } from "react-papaparse";

const buttonRef = React.createRef();

class LabelForm extends Component {
  handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleRemoveFile = (e) => {
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  macAddressFormClasses() {
    if (this.props.errors.macAddressValue) return "form-control is-invalid";
    return "form-control";
  }

  macLabelFormClasses() {
    if (this.props.errors.macLabel) return "form-control is-invalid";
    return "form-control";
  }

  printButtonClasses() {
    if (this.props.errors.macAddressValue || this.props.errors.macLabel)
      return "btn btn-primary mt-2 disabled";
    return "btn btn-primary mt-2";
  }

  render() {
    console.log("");
    const {
      macLabel,
      onMacLabelChange,
      macAddressValue,
      onMacAddressValueChange,
      onPrint,
      errors,
      handleOnFileLoad,
      handleOnError,
      handleOnRemoveFile,
    } = this.props;
    return (
      <form>
        <div className="form-group">
          <label htmlFor="macLabel">MAC Label</label>
          <input
            className={this.macLabelFormClasses()}
            id="macLabel"
            value={macLabel}
            onChange={onMacLabelChange}
            placeholder="AB"
          />
          <div className="invalid-feedback">{errors.macLabel}</div>
        </div>
        <div className="form-group">
          <label htmlFor="macAddress">MAC Address</label>
          <input
            placeholder="AABBCCDDEEFF"
            className={this.macAddressFormClasses()}
            id="macAddress"
            value={macAddressValue}
            onChange={onMacAddressValueChange}
          />
          <div className="invalid-feedback">{errors.macAddressValue}</div>
        </div>
        <p className="mb-1">Print From File</p>
        <CSVReader
          ref={buttonRef}
          onFileLoad={handleOnFileLoad}
          onError={handleOnError}
          noClick
          noDrag
          onRemoveFile={handleOnRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <button
                type="button"
                className="btn btn-success"
                onClick={this.handleOpenDialog}
                style={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  width: "40%",
                }}
              >
                Browse file
              </button>
              <div
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#ccc",
                  height: 40,
                  marginTop: 0,
                  marginBottom: 0,
                  paddingLeft: 13,
                  width: "60%",
                }}
              >
                <span className="mt-4">{file && file.name}</span>
              </div>
              <button
                className="btn btn-danger"
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
                onClick={this.handleRemoveFile}
              >
                Remove
              </button>
            </aside>
          )}
        </CSVReader>
        <button
          type="submit"
          onClick={onPrint}
          className={this.printButtonClasses()}
        >
          Print
        </button>
      </form>
    );
  }
}

export default LabelForm;
