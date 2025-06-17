export default function HeroSection() {
  return (
    <section id="heroSection" className="hero--section">
      <div className="hero--section--content--box">
        <div className="hero--section--content">
          <p className="section--title">Hey, I'm Kunal</p>
          <h1 className="hero--section--title">
            <span className="hero--section-title--color">Full Stack</span>{" "}
            <br />
            Developer
          </h1>
          <p className="hero--section--description">
            I am a full stack developer with a passion for building web applications.
            <br /> 
            I love to learn new technologies and improve my skills. I am currently 
            looking for a job as a full stack developer.
          </p>
              </div>
              <br />
              <br/>
        <a href="./img/resume.pdf" target="_blank" rel="noopener noreferrer">
          <button className="btn btn-primary">Resume</button>
        </a>
      </div>
      
      <div className="hero--section--img">
        <img src="./img/kunal2.png" alt="Hero Section" />
      </div>
    </section>
  );
}