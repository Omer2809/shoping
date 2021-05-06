import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import axios from "axios";

import Form from "../../common/form/form";

import { getProduct, saveProduct } from "../../services/productService";

import "../../styles/styledForm.css";
import Spinner from "../../common/spinner";
import FormContainer from "../../common/form/formContainer";
import Progress from "../../common/Progress";
import ProductImage from "../../common/productImage";

class ProductForm extends Form {
  state = {
    data: {
      name: "",
      price: "",
      barcode: "",
      image: "",
    },
    errors: {},
    loading: false,
    imageloading: false,
    saving: false,
    filename: "",
    uploadPercentage: 0,
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().min(3).required().label("Name"),
    price: Joi.string().required().label("Price"),
    barcode: Joi.string().required().label("Barcode"),
    image: Joi.string(),
  };

  async populateProduct() {
    try {
      const productId = this.props.match.params.id;
      if (productId === "new") return;

      this.setState({ loading: true });
      const { data: product } = await getProduct(productId);
      this.setState({ data: this.mapToViewModel(product), loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    const productId = this.props.match.params.id;
    if (productId !== "new") this.setState({ loading: true });

    await this.populateProduct();
  }

  mapToViewModel(product) {
    let data = {
      _id: product._id,
      name: product.name,
      price: product.price,
      barcode: product.barcode,
      image: product.image,
    };

    if (product.image) data.image = product.image;

    console.log(data);
    return data;
  }

  doSubmit = async () => {
    try {
      this.setState({ loading: true, saving: true });

      console.log(this.state.data);

      await saveProduct(this.state.data);

      this.setState({ loading: false, saving: false });
      this.props.history.push("/products");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.warn(ex.response.data);
      }
      this.setState({ loading: false, saving: false });
    }
  };

  uploadFileHandler = async (e) => {
    const allowedExtensions = /(\.jpg|\.png|\.jpeg)$/i;
    if (!allowedExtensions.exec(e.target.files[0].name)) {
      console.log(e.target.files[0].name);
      toast.warn("Invalid file type");
      return;
    }

    if (e.target.files[0])
      this.setState({ filename: e.target.files[0].name, uploadPercentage: 0 });

    this.setState({ imageloading: true });

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          this.setState({
            uploadPercentage: parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            ),
          });
          setTimeout(() => this.setState({ uploadPercentage: 0 }), 30000);
        },
      };

      const { data: image } = await axios.post("/upload", formData, config);

      const copydata = { ...this.state.data, image };
      this.setState({ data: copydata, imageloading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.warn(ex.response.data);
      }
      this.setState({ loading: false, imageloading: true });
    }
  };

  render() {
    return (
      <FormContainer name={"Product"} url={"/products"} product>
        {this.state.loading ? (
          <Spinner form saving={this.state.saving} />
        ) : (
          <form onSubmit={this.handleSubmit} style={{ marginTop: 50 }}>
            {this.renderInput("name", "Name")}
            {this.renderInput("price", "Price")}
            {this.renderInput("barcode", "Barcode")}
            {this.renderFileInput("choosefile", "Choose File", "file")}
            {this.state.uploadPercentage !== 0 ? (
              <Progress percentage={this.state.uploadPercentage} />
            ) : (
              ""
            )}
            {this.state.imageloading && <Spinner />}
            {!this.state.imageloading && this.state.data.image && (
              <ProductImage
                url={this.state.data.image}
                alt={this.state.filename}
                bgColor={"#060b26"}
              />
            )}
            {this.renderButton("Save")}
          </form>
        )}
      </FormContainer>
    );
  }
}

export default ProductForm;
