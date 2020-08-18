import React, { useEffect, useState } from 'react';
import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { getRegistrations, getRegistration } from '../flux/actions/registrationActions';
import { IRegistrationReduxProps, IRegistrationList, IRegistration } from '../types/interfaces';
import DataTable from 'react-data-table-component'

export const DEFAULT_PAGE_SIZE = 100

interface IRegistrationDetailsState {
  registration: IRegistration,
  loading: boolean
}

interface IRegistrationDetailsModalProps extends IRegistrationDetailsState {
  show: boolean
  onAction(status: boolean): void
}

const RegistrationDetailsModal = ({ registration, loading, show, onAction } : IRegistrationDetailsModalProps) => {
  const toggle = () => {
    onAction(false)
  }

  return (
    <div>
      <Modal isOpen={show} toggle={toggle}>
        <ModalHeader toggle={toggle}>Registration Details</ModalHeader>
        <ModalBody>
          {loading ? <Spinner /> : (
          <Table>
            <tbody>
              <tr>
                <td>First Name</td>
                <td>{registration.firstName}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{registration.lastName}</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>{registration.phoneNumber}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{registration.address}</td>
              </tr>
              <tr>
                <td>SSN</td>
                <td>{registration.ssn}</td>
              </tr>
            </tbody>
          </Table>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Ok</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

const RegistrationsList = ({ 
  getRegistrations,
  getRegistration,
  registration,
}: IRegistrationList) => {
  
  const columns = React.useMemo(() => [
    {
      name: 'First Name',
      selector: 'firstName',
    },
    {
      name: 'Last Name',
      selector: 'lastName',
    },
    {
      name: 'Phone Number',
      selector: 'phoneNumber',
    },
    {
      name: 'Address',
      selector: 'address',
    },
    {
      name: 'Actions',
      cell: (row: IRegistration) => <Button size='sm' color='secondary' onClick={async () => {
        setShowRegistrationDetailsModal(true)
        getRegistration(row._id)
      }}>View Details</Button>,
    }
  ], [getRegistration]);
  const [showRegistrationDetailsModal, setShowRegistrationDetailsModal] = useState(false)
  const [tableData, setTableData] = useState({
    pageIndex: 1,
    pageSize: DEFAULT_PAGE_SIZE
  })

  useEffect(() => {
    getRegistrations({ page: tableData.pageIndex, limit: tableData.pageSize });
  }, [getRegistrations, tableData.pageIndex, tableData.pageSize]);
  
  return (
    <Container>
      {
        showRegistrationDetailsModal && (
          <RegistrationDetailsModal show {...registration} loading={registration.registrationLoading} onAction={() => setShowRegistrationDetailsModal(false)} />
        )
      }
      <DataTable
        title="Registrations"
        columns={columns}
        data={registration.registrations}
        progressPending={registration.loading}
        pagination
        paginationServer
        paginationTotalRows={registration.count}
        onChangeRowsPerPage={(perPage, page) => setTableData(ps => ({
          ...ps,
          pageSize: perPage,
          pageIndex: page
        }))}
        onChangePage={(page) => setTableData(ps => ({
          ...ps,
          pageIndex: page
        }))}
      />
    </Container>
  );
};

const mapStateToProps = (state: IRegistrationReduxProps) => ({
  registration: state.registration
});

export default connect(mapStateToProps, { getRegistrations, getRegistration })(RegistrationsList);
