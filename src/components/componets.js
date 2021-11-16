import styled from "styled-components";

export const PostWrapper = styled.div`
  width: 40rem;
  height: fit-content;
  border: 1px solid black;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
  @media screen and (max-width: 600px) {
    width: 99%;
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 3.8rem;
  border-bottom: 2px solid grey;
  display: flex;
  align-items: center;
`;

export const Func = styled.div`
  height: 2.2rem;
  display: flex;
  align-items: center;
  margin-top: 0.4rem;
`;
export const Caption = styled.div`
  padding-left: 0.6rem;
  padding-top: 0.3rem;
  margin-top: 0.2rem;
  margin-bottom: 0.3rem;
  user-select: none;
  margin-top: 0.5rem;
`;
export const DisplayPhoto = styled.img`
  src: ${(props) => props.img};
  height: 85%;
  border: 1px solid black;
  width: 3rem;
  border-radius: 50%;
  margin-left: 0.5rem;
  user-select: none;
`;
export const DisplayUsername = styled.div`
  font-size: 1.1rem;
  padding-left: 0.6rem;
  font-weight: bold;
  cursor: pointer;
  user-select: none;

  :hover {
    text-decoration: underline;
  }
`;
export const Photo = styled.div`
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 500px;
`;
export const DisplayLikes = styled.div`
  font-size: 1.1rem;
  padding-left: 0.6rem;
  font-weight: bold;
  user-select: none;
  margin-top: 0.2rem;
  height: 1rem;
`;

export const CommentContainer = styled.div`
  width: 97.8%;
  border-bottom: 1.5px solid black;
  height: fit-content;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  display: flex;
`;
export const CommentDP = styled.img`
  border-top: 1.5px solid black;
  height: fit-content;
  height: 3rem;
  width: 3rem;
  border: 1px solid black;
  border-radius: 50%;
`;
export const CommentBackButton = styled.button`
  border: none;
  border-top: 1.5px solid black;
  width: 100%;
  background-color: transparent;
  height: 3rem;
  font-size: 1.2rem;
  cursor: pointer;
  :hover {
    background-color: aliceblue;
  }
`;

export const CommentInputContainer = styled.div`
  width: 100%;
  height: 3.5rem;
  border-top: 1.2588px solid grey;
  display: flex;
`;
export const CommentInput = styled.input`
  border: none;
  outline: none !important;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1.3rem;
  width: 80%;
`;
export const CommentPost = styled.button`
  color: ${(props) => (props.isEmpty ? "rgb(188,227,253)" : "rgb(30,161,247)")};
  width: 20%;
  background-color: white;
  border: none;
  height: 3.5rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
`;
export const Logo = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const LogOut = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 5rem;
  @media screen and (max-width: 600px) {
    padding: 0;
  }
`;
export const Form = styled.div`
  padding-top: 1rem;
  padding-left: 1rem;
`;
export const NavWraper = styled.div`
  position: fixed;
  width: 100%;
  height: 4.5rem;
  top: 0;
  left: 0;
  background-color: darkgrey;
  border-bottom: 2px solid grey;
  display: flex;
`;
