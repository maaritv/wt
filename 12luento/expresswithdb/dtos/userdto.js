function entityToDto(user) {
    const dto = {
      userid: user.id,
      username: user.username,
      name: user.name,
    };
    return dto;
  }
  
  module.exports = { entityToDto };
  