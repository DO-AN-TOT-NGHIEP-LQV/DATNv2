import validator from "is_js";

const checkEmpty = (val, key) => {
  if (val == undefined || validator.empty(val.trim())) {
    return `${key}`;
  } else {
    return "";
  }
};

const checkMinLength = (val, minLength, key) => {
  if (val.trim().length < minLength) {
    return `Vui lòng nhập hợp kệ: ${key}`;
  } else {
    return "";
  }
};

const checkSpace = (val, key) => {
  if (val.trim().includes(" ")) {
    return `${key}`;
  } else {
    return "";
  }
};

export function checkStringEmpty(val) {
  //true la rong, false la khong rong
  if (val !== undefined) {
    return validator.empty(val.trim());
  }
  return false;
}

export function validatorLogin(data) {
  const { username, email, password } = data;

  // if (username !== undefined) {
  //   let emptyValidationText = checkEmpty(username, "Vui lòng nhập email");
  //   if (emptyValidationText !== "") {
  //     return emptyValidationText;
  //   } else {
  //     let minLengthValidation = checkMinLength(username, 0, "username");
  //     if (minLengthValidation !== "") {
  //       return minLengthValidation;
  //     }
  //   }
  // }

  if (username !== undefined) {
    let emptyValidationText = checkEmpty(username, "Vui lòng nhập email");
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      if (!validator.email(username)) {
        return "Email không đúng định dạng";
      }
    }
  }

  // if (email !== undefined) {
  //   let emptyValidationText = checkEmpty(email, "Please enter your email");
  //   if (emptyValidationText !== "") {
  //     return emptyValidationText;
  //   } else {
  //     let minLengthValidation = checkMinLength(email, 0, "email");
  //     if (minLengthValidation !== "") {
  //       return minLengthValidation;
  //     }
  //   }
  // }

  if (password !== undefined) {
    let emptyValidationText = checkEmpty(password, "Vui lòng nhập mẩt khẩu");
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(password, 0, "password");
      if (minLengthValidation !== "") {
        return minLengthValidation;
      }
    }
  }
}

export function validatorRegrister(data) {
  const { username, email, password } = data;

  if (username !== undefined) {
    let emptyValidationText = checkEmpty(username, "Vui lòng nhập username");
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(username, 0, "username");
      if (minLengthValidation !== "") {
        return minLengthValidation;
      }
    }
  }

  if (email !== undefined) {
    let emptyValidationText = checkEmpty(username, "Vui lòng nhập email");
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      if (!validator.email(email)) {
        return "Email không đúng định dạng";
      }
    }
  }

  // if (email !== undefined) {
  //   let emptyValidationText = checkEmpty(email, "Please enter your email");
  //   if (emptyValidationText !== "") {
  //     return emptyValidationText;
  //   } else {
  //     let minLengthValidation = checkMinLength(email, 0, "email");
  //     if (minLengthValidation !== "") {
  //       return minLengthValidation;
  //     }
  //   }
  // }

  if (password !== undefined) {
    let emptyValidationText = checkEmpty(password, "Vui lòng nhập mật khẩu");
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(password, 0, "password");
      if (minLengthValidation !== "") {
        return minLengthValidation;
      }
    }
  }
}

export function validatorChangePass(data) {
  const { currentPass, newPass, confirmPass } = data;

  if (currentPass !== undefined) {
    let emptyValidationText = checkEmpty(
      currentPass,
      "Hãy nhập mật khẩu hiện tại"
    );

    if (emptyValidationText !== "") {
      return emptyValidationText;
    }

    let spaceValid = checkSpace(currentPass, "Không được chứa khoảng trống");
    if (spaceValid !== "") {
      return spaceValid;
    }
  }

  if (newPass !== undefined) {
    let newPassEmptyValid = checkEmpty(newPass, "Hãy nhập vào mật khẩu mới");
    if (newPassEmptyValid !== "") {
      return newPassEmptyValid;
    }

    let minLengthNewPass = checkMinLength(
      newPass,
      8,
      "Mật khẩu mới có ít nhất 8 ký tự"
    );
    if (minLengthNewPass !== "") {
      return "Mật khẩu mới có ít nhất 8 ký tự";
    }

    let spaceValidnewPass = checkSpace(newPass, "Không được chứa khoảng trống");
    if (spaceValidnewPass !== "") {
      return spaceValidnewPass;
    }
  }

  if (confirmPass !== newPass) {
    return "Mật khẩu mới không trùng khớp";
  }
}

export function validatorCreatePost(data) {
  // picker file, content, size,type, count

  const { pickedImagePath, content, size, type, count } = data;

  if (pickedImagePath !== undefined) {
    let emptyImage = checkEmpty(pickedImagePath, "Hãy chọn 1 ảnh");
    if (emptyImage !== "") {
      return emptyImage;
    }
  }

  if (content !== undefined) {
    let emptyValidationText = checkEmpty(content, "Hãy nhập nội dung ");
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(content, 0, "content");
      if (minLengthValidation !== "") {
        return minLengthValidation;
      }
    }
  }
}

export function validatorUpdateProduct(data) {
  const {
    name,
    description,
    price,
    // originalPrice,
    // link,
    type,
    brand,
    // quantity,
  } = data;

  let resValid = "Hãy nhập tên sản phẩm";
  if (name !== undefined) {
    let emptyValidationText = checkEmpty(name, resValid);
    if (emptyValidationText !== "") {
      return emptyValidationText;
    }
  } else return resValid;

  resValid = "Hãy nhập miêu tả sản phẩm: >20 ký tự";
  if (description !== undefined) {
    let emptyValidationText = checkEmpty(description, resValid);
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(description, 20, "content");
      if (minLengthValidation !== "") {
        return resValid;
      }
    }
  } else return resValid;

  resValid = "Hãy nhập giá sản phẩm";
  if (price !== undefined) {
    if (price > 50000000) return resValid + "Hãy nhập giá sản phẩm < 50 triệu";

    if (price < 0) return resValid;
  } else return resValid;

  // resValid = "Hãy nhập giá gốc sản phẩm";
  // if (originalPrice !== undefined) {
  //   if (originalPrice > 50000000)
  //     return resValid + "Hãy nhập giá gốc sản phẩm < 50 triệu";

  //   if (originalPrice < 0) return resValid;
  // } else return resValid;

  // resValid = "Hãy nhập số lượng sản phẩm";
  // if (quantity !== undefined) {
  //   if (quantity > 1000000) return resValid + "Hãy nhập giá sản phẩm < triệu";

  //   if (quantity < 0) return resValid;
  // } else return resValid;

  resValid = "Hãy nhập kiểu dáng";
  if (type !== undefined) {
    let emptyValidationText = checkEmpty(type, resValid);
    if (emptyValidationText !== "") {
      return emptyValidationText;
    }
  } else return resValid;

  resValid = "Hãy nhập nhãn hàng";
  if (name !== undefined) {
    let emptyValidationText = checkEmpty(brand, resValid);
    if (emptyValidationText !== "") {
      return emptyValidationText;
    }
  } else return resValid;

  // resValid = "Hãy nhập link sản phẩm";
  // if (link !== undefined) {
  //   let emptyValidationText = checkEmpty(link, resValid);
  //   if (emptyValidationText !== "") {
  //     return emptyValidationText;
  //   }
  // } else return resValid;
}
export function validatorCreateProduct(data) {
  const {
    pickedImagePath,
    name,
    description,
    price,
    // quantity,
    type,
    brand,
    // link,
  } = data;

  let resValid = "Hãy nhập tên sản phẩm";
  if (name !== undefined) {
    let emptyValidationText = checkEmpty(name, resValid);
    if (emptyValidationText !== "") {
      return emptyValidationText;
    }
  } else return resValid;

  resValid = "Hãy chọn 1 ảnh";
  if (pickedImagePath !== undefined) {
    let emptyImage = checkEmpty(pickedImagePath, resValid);
    if (emptyImage !== "") {
      return emptyImage;
    }
  } else return resValid;

  resValid = "Hãy nhập miêu tả sản phẩm: >20 ký tự";
  if (description !== undefined) {
    let emptyValidationText = checkEmpty(description, resValid);
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(description, 20, "content");
      if (minLengthValidation !== "") {
        return resValid;
      }
    }
  } else return resValid;

  resValid = "Hãy nhập giá sản phẩm";
  if (price !== undefined) {
    if (price > 50000000) return resValid + "Hãy nhập giá sản phẩm < 50 triệu";

    if (price < 0) return resValid;
  } else return resValid;

  // resValid = "Hãy nhập số lượng sản phẩm";
  // if (quantity !== undefined) {
  //   if (quantity > 1000000) return resValid + "Hãy nhập giá sản phẩm < triệu";

  //   if (quantity < 0) return resValid;
  // } else return resValid;

  resValid = "Hãy nhập kiểu dáng";
  if (type !== undefined) {
    let emptyValidationText = checkEmpty(type, resValid);
    if (emptyValidationText !== "") {
      return emptyValidationText;
    }
  } else return resValid;

  resValid = "Hãy nhập nhãn hàng";
  if (name !== undefined) {
    let emptyValidationText = checkEmpty(brand, resValid);
    if (emptyValidationText !== "") {
      return emptyValidationText;
    }
  } else return resValid;

  // resValid = "Hãy nhập link sản phẩm";
  // if (link !== undefined) {
  //   let emptyValidationText = checkEmpty(link, resValid);
  //   if (emptyValidationText !== "") {
  //     return emptyValidationText;
  //   }
  // } else return resValid;
}

export function validatorAddShopProduct(data) {
  const { productId, shopId, price, link, quantity } = data;

  let resValid = "Không tìm thấy Id của Shop hoặc Id sản phẩm này";

  if (
    productId == undefined ||
    shopId == undefined ||
    productId == null ||
    shopId == null
  )
    return resValid;

  resValid = "Hãy nhập giá sản phẩm";
  if (price !== undefined) {
    if (price > 50000000) return resValid + "Hãy nhập giá sản phẩm < 50 triệu";

    if (price < 0) return resValid;
  } else return resValid;

  resValid = "Hãy nhập số lượng sản phẩm";
  if (quantity !== undefined) {
    if (quantity > 1000000) return resValid + "Hãy nhập giá sản phẩm < triệu";

    if (quantity < 0) return resValid;
  } else return resValid;

  resValid = "Hãy nhập link sản phẩm";
  if (link !== undefined) {
    let emptyValidationText = checkEmpty(link, resValid);
    if (emptyValidationText !== "") {
      return emptyValidationText;
    }
  } else return resValid;
}
