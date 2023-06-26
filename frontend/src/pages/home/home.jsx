import { useSignOut } from 'react-auth-kit';
import { useNavigate, Link } from 'react-router-dom';
import { Space, Table, Input, Tag, Button, Modal, Layout } from 'antd';
import {
  DeleteOutlined,
  FormOutlined,
  CheckCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './home.css';
import { CSVLink } from 'react-csv';
import { format } from 'date-fns';

function Home() {
  const { Header, Content } = Layout;
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuario, setIdUsuario] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const singOut = useSignOut();
  const navigate = useNavigate();

  const logoutClick = () => {
    singOut();
    navigate('/login');
  };

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get('http://localhost:3000/usuarios')
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function updateStatus(id) {
    await axios.delete(`http://localhost:3000/usuarios/${id}`);
    try {
      toast.success('Status do usuário atualizado!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      initializeTable();
    } catch (error) {
      console.log(error);
      toast.error('Ocorreu um erro, tente novamente mais tarde.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  }

  async function deleteAll() {
    try {
      navigate(0);
      await axios.delete('http://localhost:3000/delete');
    } catch (error) {
      console.log(error);
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    deleteAll();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addUsuario = () => {
    navigate('/novousuario');
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Pesquisar`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      ...getColumnSearchProps('nome'),
    },
    {
      title: 'Login',
      dataIndex: 'login',
      key: 'login',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
      ...getColumnSearchProps('cpf'),
    },
    {
      title: 'Data de Nascimento',
      dataIndex: 'dataNascimento',
      key: 'dataNascimento',
      ...getColumnSearchProps('dataNascimento'),
      render: (_, record) => format(new Date(record.dataNascimento), 'yyyy-MM-dd'),
    },
    {
      title: 'Nome da mãe',
      dataIndex: 'nomeMae',
      key: 'nomeMae',
    },
    {
      title: 'Período de inserção',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ...getColumnSearchProps('createdAt'),
      render: (_, record) => format(new Date(record.createdAt), 'yyyy-MM-dd'),
    },
    {
      title: 'Período de alteração',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      ...getColumnSearchProps('updatedAt'),
      render: (_, record) => format(new Date(record.updatedAt), 'yyyy-MM-dd'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      ...getColumnSearchProps('status'),
      render: (_, record) => (
        <Tag color={record.status === 'ativo' ? 'green' : 'volcano'} key={record.status}>
          {record.status === 'ativo' ? 'Ativo' : 'Inativo'}
        </Tag>
      ),
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, record) => {
        return (
          <Space size='middle'>
            <Link to={`/editarusuario/${record.id}`}>
              <FormOutlined />
            </Link>
            {record.status === 'inativo' ? (
              <CheckCircleOutlined onClick={() => updateStatus(record.id)} />
            ) : (
              <DeleteOutlined onClick={() => updateStatus(record.id)} />
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <Layout className='layout'>
      <Header>
        <Content className='content'>
          <div className='header'>
            <Button type='primary' danger onClick={logoutClick}>
              Sair
            </Button>
          </div>
        </Content>
      </Header>
      <Content className='content'>
        <div className='titlePage'>
          <h1>Lista de usuários</h1>
        </div>
        <div className='botoesHome'>
          <CSVLink separator={';'} data={usuarios} filename={'usuarios.csv'}>
            <Button
              type='primary'
              size='large'
              style={{ background: 'green', borderColor: 'white' }}
            >
              Exportar planilha
            </Button>
          </CSVLink>
          <Button onClick={addUsuario} type='primary' color='green-6' size='large'>
            Adicionar usuário
          </Button>
          <Button type='primary' danger size='large' onClick={showModal}>
            Excluir todos os usuários
          </Button>
        </div>
        <Modal
          title='Excluir todos os usuários'
          open={isModalOpen}
          onOk={handleOk}
          okText='Deletar'
          okType='primary'
          okButtonProps={{ danger: true }}
          onCancel={handleCancel}
          cancelText='Cancelar'
        >
          <p>
            Tem certeza de que deseja <b>excluir todos os usuários</b>?
          </p>
          <p>Esta ação é irreversível.</p>
        </Modal>
        <Table columns={columns} dataSource={usuarios} pagination={{ pageSize: 10 }} rowKey='id' />
      </Content>
    </Layout>
  );
}
export { Home };
