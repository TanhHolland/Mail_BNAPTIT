export default function Images(src: string, alt: string, text: string) {
  return (
    <div>
      <img
        src={src}
        alt={alt}
        style={{ width: "200px", height: "200px", borderRadius: "20px" }}
      />
      <p
        style={{
          marginTop: "10px",
          fontSize: "18px",
          fontWeight: "500",
          color: "black",
        }}
      >
        {text}
      </p>
    </div>
  );
}
