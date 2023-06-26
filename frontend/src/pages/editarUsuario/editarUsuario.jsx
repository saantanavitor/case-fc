import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select, Layout, Col, Row } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './editarUsuario.css';

function EditarUsuario() {
  const { Header, Content } = Layout;
  const { id } = useParams();
  const [usuario, setUsuario] = useState([]);

  const navigate = useNavigate();

  const onClickBack = () => {
    navigate('/');
  };

  useEffect(() => {
    getUsuario(id);
  }, []);

  const getUsuario = async (id) => {
    axios
      .get(`http://localhost:3000/usuarios/${id}`)
      .then((response) => {
        setUsuario(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinish = async (data) => {
    try {
      const atualizar = await axios.put(`http://localhost:3000/usuarios/${id}`, data);
      if (atualizar) {
        toast.success('Usuário atualizado com sucesso!', {
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
      navigate('/');
    } catch (err) {
      toast.error('Aconteceu um erro, tente novamente!', {
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
  };

  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Por favor, selecione uma data',
      },
    ],
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 12,
    },
  };

  return (
    <>
      <Layout className='layout'>
        <Content className='content'>
          <div className='addUserPage'>
            <Row wrap>
              <Col span={24} className='titleAddUser'>
                <h1>Alteração de cadastro</h1>
              </Col>
              <Col span={24} className='formAddUser'>
                {usuario.length !== 0 ? (
                  <Form {...layout} name='nest-messages' style={{ width: 800 }} onFinish={onFinish}>
                    <Form.Item
                      name='nome'
                      label='Nome completo'
                      initialValue={usuario.nome}
                      rules={[{ required: true, message: 'Por favor, insira um nome válido' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name='login'
                      label='Login'
                      initialValue={usuario.login}
                      rules={[{ required: true, message: 'Por favor, insira um login' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name='senha'
                      label='Senha'
                      initialValue={usuario.senha}
                      rules={[{ required: true, message: 'Por favor, insira uma senha' }]}
                      hasFeedback
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      name='email'
                      label='Email'
                      initialValue={usuario.email}
                      rules={[
                        {
                          type: 'email',
                          required: true,
                          message: 'Por favor, insira um Email vlido',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name='telefone'
                      label='Telefone'
                      initialValue={usuario.telefone}
                      rules={[{ required: true, message: 'Insira um número de telefone válido' }]}
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                      name='cpf'
                      label='CPF'
                      initialValue={usuario.cpf}
                      rules={[{ required: true, message: 'Insira um número de CPF válido' }]}
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                      name='dataNascimento'
                      label='Data de nascimento'
                      initialValue={usuario.dataNascimento}
                      rules={[{ required: true, message: 'Por favor, insira uma data válida' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name='nomeMae'
                      label='Nome completo da mãe'
                      initialValue={usuario.nomeMae}
                      rules={[{ required: true, message: 'Por favor, insira um nome válido' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      initialValue={usuario.status}
                      name='status'
                      label='Status'
                      rules={[{ required: true }]}
                    >
                      <Select placeholder='Escolha um status para este usuário' allowClear>
                        <Select.Option value='ativo'>Ativo</Select.Option>
                        <Select.Option value='inativo'>Inativo</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                      }}
                    >
                      <div className='addUserButtons'>
                        <Button onClick={onClickBack} size='large' type='default'>
                          Voltar
                        </Button>
                        <Button size='large' type='primary' htmlType='submit'>
                          Finalizar edição
                        </Button>
                      </div>
                    </Form.Item>
                  </Form>
                ) : (
                  'Loading...'
                )}
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </>
  );
}

export { EditarUsuario };
