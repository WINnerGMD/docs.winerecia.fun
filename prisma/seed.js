import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  const newUsername = 'r!!%Po~kxw@5-*w67i.%q9Zh%p^EP4';
  const newPassword = 'yKuWQT*tsA52XHkjQ@oaCivuPJymjv';

  // 1. Сносим старого админа если есть
  try {
    const oldAdmin = await prisma.user.findUnique({ where: { username: 'admin' } });
    if (oldAdmin) {
      await prisma.user.delete({ where: { username: 'admin' } });
      console.log('Старый админ удален');
    }
  } catch (e) {
    console.log('Старого админа не было или какая-то ошибка, пофиг');
  }

  // 2. Создаем или обновляем нужного юзера
  const hashedPassword = await Bun.password.hash(newPassword);
  
  const user = await prisma.user.upsert({
    where: { username: newUsername },
    update: { password: hashedPassword },
    create: {
      username: newUsername,
      password: hashedPassword
    }
  });

  console.log(`Пользователь готов: ${newUsername}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
