import { useSignIn, useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { Button, Checkbox, Form, Input, Layout } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';

function Login() {

  const { Header, Content } = Layout;

  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  });

  const loginClick = () => {};

  const onFinish = async (data) => {
    try {
      const login = await axios.post('http://localhost:3000/login', data);
      if (login) {
        signIn({
          token: login.data.token,
          expiresIn: 3600,
          tokenType: 'Bearer',
          authState: { email: login.data.email },
        });
        toast.success('Login efetuado com sucesso', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        navigate('/');
      }
    } catch (err) {
      toast.error('Usuário invalido', {
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

  return (
    <Layout className='layout'>
      <Content className='content'>
        <div className='loginPage'>
          <div className='loginCard'>
            <Form
              name='basic'
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete='off'
            >
              <Form.Item
                label='Login'
                name='login'
                rules={[{ required: true, message: 'Por favor, insira o login corretamente' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='Senha'
                name='senha'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira a senha corretamente',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 20,
                  span: 16,
                }}
              >
                <Button type='primary' htmlType='submit'>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export { Login };
