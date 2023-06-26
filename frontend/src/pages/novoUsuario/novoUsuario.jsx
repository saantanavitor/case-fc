import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select, Layout, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './novoUsuario.css';

function NovoUsuario() {
  const { Content } = Layout;

  const navigate = useNavigate();

  const onClickBack = () => {
    navigate('/');
  };

  const onFinish = async (data) => {
    try {
      console.log(data);
      const cadastro = await axios.post('http://localhost:3000/usuarios', data);
      if (cadastro) {
        toast.success('Usuário cadastrado com sucesso!', {
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
      toast.error('Houve um erro, tente novamente!', {
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
                <h1>Cadastro de novo usuário</h1>
              </Col>
              <Col span={24} className='formAddUser'>
                <Form {...layout} name='nest-messages' style={{ width: 800 }} onFinish={onFinish}>
                  <Form.Item
                    name='nome'
                    label='Nome completo'
                    rules={[{ required: true, message: 'Por favor, insira um nome válido' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name='login'
                    rules={[{ required: true, message: 'Por favor, insira um login' }]}
                    label='Login'
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name='senha'
                    label='Senha'
                    rules={[{ required: true, message: 'Por favor, insira uma senha' }]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name='email'
                    label='Email'
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
                    rules={[{ required: true, message: 'Insira um número de telefone válido' }]}
                  >
                    <Input style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item
                    name='cpf'
                    label='CPF'
                    rules={[{ required: true, message: 'Insira um número de CPF válido' }]}
                  >
                    <Input style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item
                    name='dataNascimento'
                    label='Data de nascimento'
                    rules={[{ required: true, message: 'Por favor, insira uma data válida' }]}
                  >
                    <Input placeholder='Exemplo: MM/DD/YYYY' />
                  </Form.Item>
                  <Form.Item
                    name='nomeMae'
                    label='Nome completo da mãe'
                    rules={[{ required: true, message: 'Por favor, insira um nome válido' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name='status' label='Status' rules={[{ required: true }]}>
                    <Select placeholder='Escolha um status para este usuário' allowClear>
                      <Select.Option value='ativo'>Ativo</Select.Option>
                      <Select.Option value='Inativo'>Inativo</Select.Option>
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
                        Finalizar cadastro
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </>
  );
}

export { NovoUsuario };
