import Mail from '../lib/Mail';

export default {
  key: 'RegistrationMail',
  
  async handle({ data }) {
    const { user } = data;

    await Mail.sendMail({
      from: 'Redis Queue Test <redisqueue@test.com>',
      to: `${user.name} <${user.email}>`,
      subject: 'Cadastro de usuario',
      html: `Olá, ${user.name}, bem-vindo ao sistema de filas da Rocketseat :D`
    })
  }
}