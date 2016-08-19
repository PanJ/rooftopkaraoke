import React, { Component } from 'react';
import './App.css';
import domtoimage from 'dom-to-image';

class App extends Component {
  state = {
    th: '',
    en: '',
    thBar: 50,
    enBar: 50,
    thFont: 25,
    enFont: 15,
    base64: '',
    renderedBase64: ''
  }
  renderImage() {
    console.log(domtoimage);
    domtoimage.toPng(this.refs.display).then((data) => this.setState({ renderedBase64: data })).catch((e) => console.log(e));
  }
  render() {
    return (
      <div className="app container" style={{maxWidth: '700px'}}>
        <h1 className="text-center" style={{ fontFamily: '"Kanit", sans-serif', fontSize: '28px'}}>
          ROOFTOP KARAOKE GENERATOR
        </h1>
        <h2 className="sub">แนะนำให้ใช้งานด้วย Chrome บนคอมพิวเตอร์</h2>
        <div className="edit-section">
          <div className="row form-group">
            <div className="col-sm-4 text-right">
              อัพโหลดไฟล์
            </div>
            <div className="col-sm-8">
              <input className="form-control" type="file" accept="image/*" onChange={(e) => {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                  this.setState({ base64: reader.result }, this.renderImage);
                })
                if (e.target.files[0]) {
                  reader.readAsDataURL(e.target.files[0]);
                }
              }} />
            </div>
          </div>
          {
            this.state.base64 && this.state.base64 !== '' && <div>
              <div className="row form-group">
                <div className="col-sm-12">
                  <input className="form-control" type="text" placeholder="คำร้องภาษาไทย" value={this.state.th}
                    onChange={(e) => this.setState({ th: e.target.value }, this.renderImage)} />
                </div>
              </div>
              <hr />
              <div className="row form-group">
                <div className="col-sm-3 text-right">แถบสีฟ้า (%)</div>
                <div className="col-sm-3">
                  <input className="form-control" min="0" max="100" type="number" placeholder="0-100" value={this.state.thBar}
                    onChange={(e) => this.setState({ thBar: e.target.value }, this.renderImage)} />
                </div>
                <div className="col-sm-3 text-right">ขนาดอักษร</div>
                <div className="col-sm-3">
                  <input className="form-control" min="0" max="100" type="number" value={this.state.thFont}
                    onChange={(e) => this.setState({ thFont: e.target.value }, this.renderImage)} />
                </div>
              </div>
              <hr />
              <div className="row form-group">
                <div className="col-sm-8">
                  <input className="form-control" type="text" placeholder="คำร้องภาษาอังกฤษ" value={this.state.en}
                    onChange={(e) => this.setState({ en: e.target.value.toUpperCase() }, this.renderImage)} />
                </div>
              </div>
              <div className="row form-group">
                <div className="col-sm-3 text-right">แถบสีฟ้า (%)</div>
                <div className="col-sm-3">
                  <input className="form-control" min="0" max="100" type="number" placeholder="0-100" value={this.state.enBar}
                    onChange={(e) => this.setState({ enBar: e.target.value }, this.renderImage)} />
                </div>
                <div className="col-sm-3 text-right">ขนาดอักษร</div>
                <div className="col-sm-3">
                  <input className="form-control" min="0" max="100" type="number" value={this.state.enFont}
                    onChange={(e) => this.setState({ enFont: e.target.value }, this.renderImage)} />
                </div>
              </div>
            </div>
          }

        </div>
        <hr />
        <div className="display-section form-group" ref="display">
          { this.state.base64 && this.state.base64 !== '' &&
            <img alt="background" src={this.state.base64} />
          }

          {
            ['th', 'en'].map((lang) =>
              ['', 'top','overlay', 'overlay top'].map((className, index) =>
                <p key={`${lang}${className}`} className={`lyric-${lang} ${className}`}
                  style={index > 1 ? {
                    clip: `rect(0px, ${parseFloat(this.state[`${lang}Bar`]) * 6.7}px, 100px, 0px)`,
                    fontSize: `${this.state[`${lang}Font`]}px`
                  } : {
                    fontSize: `${this.state[`${lang}Font`]}px`
                  }}>{this.state[lang]}</p>
              )
            )
          }
        </div>
        {
          this.state.base64 !== '' && this.state.renderedBase64 === '' &&
          <p style={{color: '#999999', fontSize: '12px', marginTop: '10px', textAlign: 'center'}}>แนะนำให้ใช้งานด้วย Chrome บนคอมพิวเตอร์ อาจไม่สามารถดาวน์โหลดภาพได้ใน Browser อื่นๆ สามารถใช้การ Capture หน้าจอเพื่อนำภาพไปใช้ได้ </p>
        }
        { this.state.renderedBase64 && this.state.renderedBase64 !== '' &&
          <div className="text-center form-group">
            <a className="btn btn-lg btn-primary" href={this.state.renderedBase64} download="rooftop-karaoke.png"
            >ดาวน์โหลด</a>
          <p style={{color: '#999999', fontSize: '12px', marginTop: '10px'}}>ภาพที่ดาวน์โหลดอาจไม่ตรงกับภาพที่แสดงผล<br/>หากต้องการภาพที่แสดงผลสามารถใช้การ Capture หน้าจอได้</p>
          </div>
        }

      </div>
    );
  }
}

export default App;
