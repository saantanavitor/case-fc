import { useSignOut } from 'react-auth-kit';
import { useNavigate, Link } from 'react-router-dom';
import { Space, Table, Tag, Button, Modal, Layout } from 'antd';
import {
  DeleteOutlined,
  FormOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './home.css';

function Home() {
  const { Header, Content } = Layout;

  const [usuarios, setUsuarios] = useState([]);
  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get('http://localhost:3000/usuarios')
      .then((response) => {
        console.log('response', response.data);
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
      await axios.delete('http://localhost:3000/delete');
    } catch (error) {
      console.log(error);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const singOut = useSignOut();
  const navigate = useNavigate();

  const logoutClick = () => {
    singOut();
    navigate('/login');
  };

  const addUsuario = () => {
    navigate('/novousuario');
  };

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
    },
    {
      title: 'Data de Nascimento',
      dataIndex: 'dataNascimento',
      key: 'dataNasc',
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
    },
    {
      title: 'Período de alteração',
      dataIndex: 'modifiedAt',
      key: 'modifiedAt',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, record ) => (
        <Tag color={record.status === 'ativo' ? 'green' : 'volcano'} key={record.status}>
          {record.status === 'ativo' ? 'Ativo' : 'Inativo'}
          {console.log(record.status)}
        </Tag>
      ),
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, record) => {
        console.log('record', record);
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
          onCancel={handleCancel}
        >
          <p>
            Tem certeza de que deseja <b>excluir todos os usuários</b>?
          </p>
          <p>Esta ação é irreversível.</p>
        </Modal>
        <Table columns={columns} dataSource={usuarios} />
      </Content>
    </Layout>
  );
}
export { Home };
