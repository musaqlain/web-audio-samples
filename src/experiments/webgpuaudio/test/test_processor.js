import GPUProcessor from "../gpu-processor.js";
import { createTestIR } from "../ir-helper.js"

/**
 * A simple class to unit-test various functionalities of WebGPUAudio
 * and post failures to the console. Tests can be run from
 * http://localhost:8080/experiments/webgpuaudio/test/.
 * 
 * Add the actual test code here. To set up the html page, head over to
 * test_page_handler.js and set up the code.
 *
 * @class TestProcessor
 */
class TestProcessor {

  constructor() {}
    
  /**
     * Tests that WebGPU convolution logic works by passing in an impulse response
     * and verifying that the IR function generated by the IRHelper works.
     * @returns {boolean}
     */
  async testConvolution() {
    console.log('[test_processor.js] Running: testConvolution()');
    const test_ir = createTestIR();
    let gpuProcessor = new GPUProcessor();
    gpuProcessor.setIRArray(test_ir);
    await gpuProcessor.initialize();
    if(!navigator.gpu) {
        return;
    }

    // Create impulse function.
    const input = new Float32Array(20);
    input[0] = 1;

    // Process convolution.
    const output_result = await gpuProcessor.processConvolution(input);

    // Parse outputs.
    const output_ir_size = output_result.slice(0, test_ir.length);

    // Verify.
    const asserted_output = output_ir_size.toString() === test_ir.toString();
    console.assert(asserted_output,  "Expected: [" + test_ir.toString() +
                   "]\n Actual: [" + output_ir_size.toString()+"].\n",
                   "See TestProcessor.testConvolution() in test_processor.js for more info.");
    console.log('[test_processor.js] Complete: testConvolution()');
    return asserted_output;
  }
};

export default TestProcessor;

console.log('[test_processor.js] loaded.');
