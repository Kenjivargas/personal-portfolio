import portraitSrc from '../../../assets/KenjiVargas.webp'

export default function Portrait() {
  return (
    <figure className="portrait">
      <div className="portrait__frame">
        <img
          className="portrait__img"
          src={portraitSrc}
          alt="Portrait of Kenji Vargas"
          width="768"
          height="846"
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className="portrait__caption">
        <span className="portrait__name">Kenji Vargas</span>
        <span className="portrait__role">Full-stack developer</span>
      </figcaption>
    </figure>
  )
}
