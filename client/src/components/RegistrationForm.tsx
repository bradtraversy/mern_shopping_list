import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  ModalFooter
} from 'reactstrap';
import { IRegistration } from '../types/interfaces';
import environment from '../environment';

interface IAlertModalProps {
  show: boolean
  title: string
  description: string
  onAction(status: boolean): void
}

const AlertModal = ({ show, title, description, onAction } : IAlertModalProps) => {
  const toggle = () => {
    onAction(false)
  }

  return (
    <div>
      <Modal isOpen={show} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{description}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Ok</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const RegistrationForm = () => {
  const [newRegistration, setNewRegistration] = useState<IRegistration>({
    _id: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    ssn: ''
  });
  const [submitState, setSubmitState] = useState({
    submitted: false,
    inProgress: false,
    submitSuccess: false
  })
  const [alertModalProps, setAlertModalProps] = useState<IAlertModalProps>({
    show: false,
    title: '',
    description: '',
    onAction: () => {}
  })
  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitState(ps => ({
      ...ps,
      submitted: true
    }))
    if(!newRegistration.firstName || !newRegistration.lastName || !newRegistration.phoneNumber || !newRegistration.address || !newRegistration.ssn) {
      return setAlertModalProps(ps => ({
        ...ps,
        title: 'Invalid registration data',
        description: 'Please enter valid info.',
        show: true,
        onAction: () => {
          setAlertModalProps(ps => ({
            ...ps,
            show: false
          }))
        }
      }))
    }
    try {
      await axios
        .post(`${environment.BASE_URL}/api/registrations/`, newRegistration)
      setSubmitState(ps => ({
        ...ps,
        submitSuccess: true
      }))
    } catch(ex) {
      alert('Unable to register')
    }
  };

  return (
    <div>
      <h3>Register here..!</h3>
      <AlertModal {...alertModalProps} />
      {submitState.submitSuccess
        ? (
          <>
            <h1>Thank you!</h1>
            <p>Your registration is successful!</p>
          </>
        )
        : (
          <Form onSubmit={e => handleOnSubmit(e)}>
            <FormGroup>
              <Label for="exampleEmail">First Name</Label>
              <Input invalid={submitState.submitted && newRegistration.firstName === ''} onChange={e => e.target && setNewRegistration(ps => ({
                ...ps,
                firstName: e.target.value
              }))} value={newRegistration.firstName} />
              <FormFeedback valid={newRegistration.firstName !== ''}>Please enter first name</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Last Name</Label>
              <Input invalid={submitState.submitted && newRegistration.firstName === ''} onChange={e => e.target && setNewRegistration(ps => ({
                ...ps,
                lastName: e.target.value
              }))} value={newRegistration.lastName} />
              <FormFeedback valid={newRegistration.lastName !== ''}>Please enter last name</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Phone Number</Label>
              <Input invalid={submitState.submitted && newRegistration.phoneNumber === ''} onChange={e => e.target && setNewRegistration(ps => ({
                ...ps,
                phoneNumber: e.target.value
              }))} value={newRegistration.phoneNumber} />
              <FormFeedback valid={newRegistration.lastName !== ''}>Please enter phone number</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">SSN</Label>
              <Input invalid={submitState.submitted && newRegistration.ssn === ''} onChange={e =>  e.target && setNewRegistration(ps => ({
                ...ps,
                ssn: e.target.value
              }))} value={newRegistration.ssn} />
              <FormFeedback valid={newRegistration.lastName !== ''}>Please enter phone number</FormFeedback>
            </FormGroup>
            <Button>Register</Button>
          </Form>
        )
      }
      
    </div>
  );
};

export default RegistrationForm
