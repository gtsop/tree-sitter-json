import XCTest
import SwiftTreeSitter
import TreeSitterJson

final class TreeSitterJsonTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_json())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Json grammar")
    }
}
