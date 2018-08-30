/* @flow */

import React from "react";
import { Editor } from "../../src";

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
    xhr.open(
      "POST",
      "https://cg-test.myyscm.com/huangqs/bms/index.php?r=CzSupplier/api/run&o=newcgsaas&p=cgsupplier.common.upload"
    );
    xhr.setRequestHeader("Authorization", "Client-ID 8d26ccd12712fca");
    const data = new FormData(); // eslint-disable-line no-undef
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      console.log(reponse, 888);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}
const createApiUrl = (action, tenant) => {
  // 获取租户代码
  tenant = encodeURIComponent("newcgsaas");

  let paramsArray = [];
  paramsArray.push(`r=CzSupplier/api/run`);
  paramsArray.push(`o=${tenant}`);
  paramsArray.push(`p=${action}`);

  return (
    "https://cg-test.myyscm.com/huangqs/bms/index.php?" + paramsArray.join("&")
  );
};

const uploadImage2 = file => {
  return new Promise((resolve, reject) => {
    let form = new FormData();
    let data = {
      fileName: file.name
    };
    form.append("file", file);
    form.append("data", JSON.stringify(data));

    fetch(createApiUrl("cgsupplier.common.upload"), {
      method: "POST",
      body: form
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        if (data.result) {
          resolve({
            data: { link: data.data.file_path, name: data.data.file_name }
          });
        } else {
          reject(data.msg);
        }
      })
      .catch(e => {
        reject(e.msg);
      });
  });
};
const ImageUpload = () => (
  <div className="rdw-storybook-root">
    <h3>Image option supports image upload also.sss</h3>
    <Editor
      toolbarClassName="rdw-storybook-toolbar"
      wrapperClassName="rdw-storybook-wrapper"
      editorClassName="rdw-storybook-editor"
      toolbar={{
        fileUpload: {
          uploadCallback: uploadImage2,
          alt: { present: true, mandatory: false },
          inputAccept: null,
          uploadEnabled: true,
          previewImage: true
        }
      }}
    />
  </div>
);

export default ImageUpload;
