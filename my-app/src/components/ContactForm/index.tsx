import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide, Zoom } from "react-awesome-reveal";
import { ContactProps, ValidationTypeProps } from "./types";
import { useForm } from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import { Button } from "../../common/Button";
import Block from "../Block";
import Input from "../../common/Input";
import swal from 'sweetalert';
import {useState,ChangeEvent} from "react";
import { contact } from "../../api";
import TextArea from "../../common/TextArea";
import { ContactContainer, FormGroup, Span, ButtonContainer } from "./styles";

const Contact = ({ title, content, id, t }: ContactProps) => {
  const { values, errors, handleChange} = useForm(
    validate
  ) as any;

  // const [formData, setFormData] = useState({ Name: '', City: '',PhoneNumber: '', Email: ''});
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [city,setCity] = useState<string>('');
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formData ={
      Email: email,
      Name: name,
      PhoneNumber: phoneNumber,
      City: city
    }
    console.log(formData);
    contact(formData).then((result: { status: string; }) => {
      console.log({result});
      if(result.status=="Message Sent")swal("Congrats for being host!",`We will contact you Soon!`,"success");
      else swal("Contact Us",`${result.status}`,"error");
    }).catch((error: any) => {console.log(error)});
 }
  const ValidationType = ({ type }: ValidationTypeProps) => {
    const ErrorMessage = errors[type];
    return (
      <Zoom direction="left">
        <Span erros={errors[type]}>{ErrorMessage}</Span>
      </Zoom>
    );
  };

  return (
    <ContactContainer id={id}>
      <Row justify="space-between" align="middle">
        <Col lg={12} md={11} sm={24} xs={24}>
          <Slide direction="left">
            <Block title={title} content={content} />
          </Slide>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Slide direction="right">
            <FormGroup autoComplete="off" onSubmit={handleSubmit}>
              <Col span={24}>
                <Input
                  type="text"
                  name="Your Name*"
                  placeholder="Your Name"
                  value={name}
                  onChange = {(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
                    setName(e.target.value);}}
                />
                <ValidationType type="name" />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="City*"
                  placeholder="Where you want to host?"
                  value={city}
                  onChange = {(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
                    setCity(e.target.value);}}
                />
                <ValidationType type="name" />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="Phone Number*"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange = {(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
                    setPhoneNumber(e.target.value);}}
                />
                <ValidationType type="name" />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="Email*"
                  placeholder="What's your Email"
                  value={email}
                  onChange = {(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
                    setEmail(e.target.value);}}
                />
                <ValidationType type="email" />
              </Col>
              <ButtonContainer>
                <Button name="submit">{t("Send Message")}</Button>
              </ButtonContainer>
            </FormGroup>
          </Slide>
        </Col>
      </Row>
    </ContactContainer>
  );
};

export default withTranslation()(Contact);
