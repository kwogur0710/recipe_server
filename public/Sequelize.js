// 사용자 이름 눌렀을 때 댓글 로딩
document.querySelectorAll('#user-list tr').forEach((el) => {
    el.addEventListener('click', function () {
      const id = el.querySelector('td').textContent;
      //getComment(id);
    });
  });
  //처음 한번만 실행
  window.onload=function(){
    //실행할 내용
    getUser();
  }
  // 사용자 로딩
  async function getUser() {
    try {
      console.log('getUser()');
      const res = await axios.get('/users');
      const users = res.data;
      console.log(users);
      const tbody = document.querySelector('#user-list tbody');
      tbody.innerHTML = '';
      users.map(function (user) {
        const row = document.createElement('tr');
        // 로우 셀 추가
        let td = document.createElement('td');
        td.textContent = user.id;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.password;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.name;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.birth;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.gender;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.email;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.address;
        row.appendChild(td);
        tbody.appendChild(row);
      });
    } catch (err) {
      console.error(err);
    }
  }
  // 사용자 등록 시
  document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const number = e.target.number.value;
    const birth = e.target.birth.value;
    const gender = e.target.gender.value;
    const email = e.target.email.value;
    const address = e.target.address.value;
    if (!id) {
      return alert('아이디을 입력하세요');
    }
    if (!password) {
      return alert('비밀번호를 입력하세요');
    }
    if (!name) {
      return alert('이름을 입력하세요');
    }
    if (!number) {
      return alert('번화번호를 입력하세요');
    }
    if (!birth) {
      return alert('생년월일을 입력하세요');
    }
    if (!gender) {
      return alert('성별을 입력하세요');
    }
    if (!email) {
      return alert('이메일을 입력하세요');
    }
    if (!address) {
      return alert('주소를 입력하세요');
    }
    try {
      await axios.post('/users', { id, password, name, number, birth, gender, email, address });
      console.log(id, password, name, number, birth, gender, email, address);
      getUser();
    } catch (err) {
      console.error(err);
    }
    e.target.id.value = '';
    e.target.password.value = '';
    e.target.name.value = '';
    e.target.number.value = '';
    e.target.birth.value = '';
    e.target.gender = '';
    e.target.email.value = '';
    e.target.address.value = '';
  });