export default function DownloadableLinks({ files }: { files: string[] }) {
    const handleDownload = (fileUrl: string) => {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", ""); // The download attribute is still used
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up after the download is triggered
    };
  
    return (
      <div>
        <h2>Downloadable Content</h2>
        <ul>
          {files.map((fileUrl, index) => (
            <li key={index} className="mb-2">
              <button
                onClick={() => handleDownload(fileUrl)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Download File {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  