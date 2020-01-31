import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
import './FileUploader.css'

class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  render() {
    return (
        <ImageUploader
            withPreview={true}
            withIcon={false}
            label={'Maksymalnie do 25MB | Obsługiwane typy plików: .jpeg .jpg .png'}
            buttonText='Wybierz zdjęcia'
            fileSizeError={" rozmiar pliku jest za duży"}
            fileTypeError={" nie jest wspieranym rozszerzeniem pliku"}
            onChange={this.onDrop}
            imgExtension={['.jpg', '.jpeg', '.png']}
            maxFileSize={25242880}
        />
    );
  }
}

export default FileUploader;
