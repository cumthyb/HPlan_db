import bcrypt from "bcrypt";

//生成salt的迭代次数
const saltRounds = 10;
//随机生成salt
const salt = bcrypt.genSaltSync(saltRounds);

const encrypt = async pwd => {
  const hash =await bcrypt.hashSync(pwd, salt);
  return hash
};

const validate = async (pwd, hash) => {
    const match = await bcrypt.compare(pwd, hash)
    return match
}

export { encrypt, validate };
