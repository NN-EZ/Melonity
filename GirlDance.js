let animationScript = {};
// Contact: dikiiebator
// Server: https://discord.gg/ZrfrNcfamp
let frameHandles = [];
let startTime = GameRules.GetGameTime();
//let frameDuration = 0.09;

let xPos = Menu.AddSlider(["Animation"], "X Position", 0, 1920, 960, 5);
let yPos = Menu.AddSlider(["Animation"], "Y Position", 0, 1080, 540, 5);
let size = Menu.AddSlider(["Animation"], "Image Size", 50, 500, 100, 10);
let frameDuration = Menu.AddSlider(["Animation"], "Speed", 0.01, 1.00, 0.02, 0.01);
let animations = ["dancegirl2", "sleep", "edance", "akyla"];
let totalFramesArray = [32, 12, 11, 10];
let animationIndex = Menu.AddComboBox(["Animation"], "Select Animation", animations, 0);

animationScript.OnDraw = function() {
    if (!GameRules.IsActiveGame()) return;

    let currentTime = GameRules.GetGameTime();
    let elapsedTime = currentTime - startTime;
    
    let selectedAnimation = animations[animationIndex.GetValue()];
    let totalFrames = totalFramesArray[animationIndex.GetValue()];

    let frameNumber = Math.floor(elapsedTime / frameDuration.GetValue()) % totalFrames;

    if (!frameHandles[selectedAnimation]) {
        frameHandles[selectedAnimation] = [];
    }

    if (!frameHandles[selectedAnimation][frameNumber]) {
        frameHandles[selectedAnimation][frameNumber] = Renderer.LoadImage(`~/script/dancescript/${selectedAnimation}/frame_${frameNumber}.png`);
    }

    let imageHandle = frameHandles[selectedAnimation][frameNumber];

    let x = xPos.GetValue();
    let y = yPos.GetValue();
    let imageSize = size.GetValue();

    Renderer.SetDrawColor(255, 255, 255, 255);
    Renderer.DrawImage(imageHandle, x - imageSize / 2, y - imageSize / 2, imageSize, imageSize);
};

RegisterScript(animationScript);
