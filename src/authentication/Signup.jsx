import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faPinterest } from "@fortawesome/free-brands-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import signup from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [reqNam, setReqName] = useState(false);
  const [emailcheck, setEmailcheck] = useState(false);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    let flag = true;
    e.preventDefault();
    setAccept(true);
    setReqName(true);
    setEmailcheck(true);

    if (name === "" || password.length < 8 || email === "") {
      flag = false;
    } else flag = true;
    try {
      if (flag) {
        const res = await axios
          .get("http://localhost:8000/users", {
            email: email,
          })
          .then();
        var check = res.data.find((u) => u.email === email);
        check ? setEmailError(422) : setEmailError("");
      }
      console.log(check);
      if (flag && check === undefined) {
        await axios
          .post("http://localhost:8000/users", {
            name: name,
            email: email,
            password: password,
            cart: [],
          })
          .then((t) => t.data);
        navigate("/login");
      }
    } catch (err) {
      setEmailError(err.response.status);
    }
  }
  function hideEmailmsg() {
    setEmailcheck(false);
  }
  function hideNameMessage() {
    setReqName(false);
  }
  function hidePassMessage() {
    setAccept(false);
  }

  return (
    <div className={signup.container} dir="rtl">
      <div className={signup.secondHalf}>
        <Link to="/login">
          <button className={signup.FBtn}>تسجيل الدخول</button>
        </Link>
        <button className={signup.LBtn}>انشاء حساب</button>
      </div>
      <div className={signup.leftHalf}>
        <form className={signup.signupForm} onSubmit={submit}>
          <h1 className={signup.heading}>Smart Shop</h1>
          <h2 className={signup.formLable}>انشاء حساب</h2>
          <p className={signup.instruction}>انشئ حساب مجاني واستمتع به</p>
          <div className={signup.inputFields}>
            <div className={signup.cont}>
              <input
                onFocus={hideNameMessage}
                className={signup.userField}
                type="text"
                placeholder="الاسم"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <FontAwesomeIcon className={signup.icon} icon={faUser} />
            </div>
            {name === "" && reqNam && (
              <p style={{ margin: "5px", color: "#a00" }}>
                Username Is Required↪
              </p>
            )}
            <div className={signup.cont}>
              <input
                onFocus={hideEmailmsg}
                className={signup.emailField}
                type="email"
                placeholder="البريد الالكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <FontAwesomeIcon className={signup.icon} icon={faEnvelope} />
            </div>
            {emailcheck && email === "" && (
              <p style={{ margin: "5px", color: "#a00" }}>Email Is Required↪</p>
            )}
            {emailcheck && emailError === 422 && (
              <p style={{ margin: "5px", color: "#a00" }}>
                ↪Email Is Already Used
              </p>
            )}
            <div className={signup.cont}>
              <input
                onFocus={hidePassMessage}
                className={signup.passField}
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon className={signup.icon} icon={faLock} />
            </div>
            {password.length < 8 && accept && (
              <p style={{ margin: "5px", color: "#a00" }}>
                Password must be more than 8 charactar↪
              </p>
            )}
          </div>
          <div className={signup.otherAttr}>
            <button className={signup.signupBtn} type="submit">
              انشاء حساب
            </button>
            <Link>هل نسيت كلمة المرور؟</Link>
          </div>
          <p className={signup.p}>او سجل الدخول عبر:</p>
          <div className={signup.socialMediaIcons}>
            <FontAwesomeIcon className={signup.socialIcon} icon={faTwitter} />
            <FontAwesomeIcon className={signup.socialIcon} icon={faFacebookF} />
            <FontAwesomeIcon className={signup.socialIcon} icon={faPinterest} />
            <FontAwesomeIcon
              className={signup.socialIcon}
              icon={faLinkedinIn}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
